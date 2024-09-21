import { FC, useEffect, useMemo, useState } from 'react';
import {
  crowdControlDebuffSkillIDs,
  intelligenceBasedSkillIDs,
  movementSkillIDs,
  selfBuffSkillIDs,
  SKILL_TAG,
  SKILLS,
  strengthBasedSkillIDs,
} from '../../constants/skill';
import { Icon } from './Icon';
import { ISkill } from '../../types';
import { IconButton } from './IconButton';
import { Tooltip } from './Tooltip';
import { useGameStateStore } from '../../stores/game';
import { usePlayerStore } from '../../stores/player';
import { Button } from './Button';
import { useCampaignStore } from '../../stores/campaign';

const ICON_SIZE = 50;

export const Compendium: FC = () => {
  const { player, setPlayerSkills } = usePlayerStore();

  const [equippedSkills, setEquippedSkills] = useState<ISkill[]>(player.skills);

  const { isCompendiumOpen, setIsCompendiumOpen } = useGameStateStore();

  const { campaigns, selectedCampaign, setSelectedCampaign, setCampaigns } =
    useCampaignStore();

  // Establish the different categories of skills

  const strengthBasedSkills = useMemo(() => {
    return SKILLS.filter(
      (skill) =>
        !movementSkillIDs.includes(skill.id) &&
        strengthBasedSkillIDs.includes(skill.id)
    );
  }, []);

  const intelligenceBasedSkills = useMemo(() => {
    return SKILLS.filter(
      (skill) =>
        !movementSkillIDs.includes(skill.id) &&
        intelligenceBasedSkillIDs.includes(skill.id)
    );
  }, []);

  const selfBuffSkills = useMemo(() => {
    return SKILLS.filter((skill) => selfBuffSkillIDs.includes(skill.id));
  }, []);

  const crowdControlDebuffSkills = useMemo(() => {
    return SKILLS.filter((skill) =>
      crowdControlDebuffSkillIDs.includes(skill.id)
    );
  }, []);

  const movementSkills = useMemo(() => {
    return SKILLS.filter((skill) => movementSkillIDs.includes(skill.id));
  }, []);

  // When compendium is first rendered, ensure different category of skills all add up to the total amount of available skills
  useEffect(() => {
    // Ensure skill categories are computeed
    if (
      strengthBasedSkills.length === 0 ||
      intelligenceBasedSkills.length === 0 ||
      selfBuffSkills.length === 0 ||
      crowdControlDebuffSkills.length === 0 ||
      movementSkills.length === 0
    ) {
      console.error('Compendium useEffect: Skill categories are not computed');
      return;
    }

    // Ensure all skills are accounted for
    const totalSkills = [
      ...strengthBasedSkills,
      ...intelligenceBasedSkills,
      ...selfBuffSkills,
      ...crowdControlDebuffSkills,
      ...movementSkills,
    ];

    const skillsNotAccountedFor = SKILLS.filter(
      (skill) => !totalSkills.includes(skill)
    );

    if (totalSkills.length !== SKILLS.length) {
      console.error(
        'Compendium useEffect: Total skills do not add up to the total amount of skills',
        totalSkills.length,
        SKILLS.length,
        skillsNotAccountedFor
      );
    } else {
      console.log(
        'Compendium useEffect: Total skills add up to the total amount of skills'
      );
    }
  }, [
    strengthBasedSkills,
    intelligenceBasedSkills,
    selfBuffSkills,
    crowdControlDebuffSkills,
    movementSkills,
  ]);

  // When compendium is closed, reset player skills to equipped skills
  useEffect(() => {
    if (isCompendiumOpen === false) {
      // Reset player skills to equipped skills
      setEquippedSkills(player.skills);
    }
  }, [player.skills, isCompendiumOpen]);

  const renderSkillButtonTooltip = (skill: ISkill) => {
    const tagString = skill.tags
      .map((tag) => {
        switch (tag) {
          case SKILL_TAG.SINGLE_TARGET:
            return 'Single Target';
          case SKILL_TAG.AOE:
            return 'AoE';
          default: {
            const tagString = tag.replace(/_/g, ' ');
            return tagString.charAt(0).toUpperCase() + tagString.slice(1);
          }
        }
      })
      .join(', ');

    // Strength-based skills vs Intelligence-based skills
    if (strengthBasedSkillIDs.includes(skill.id)) {
      return (
        <Tooltip width={450}>
          <h2>{skill.name}</h2>
          <p>{tagString}</p>
          <p>{skill.description}</p>
          {skill.damageMultiplier > 0 ? (
            <p>Damage Multiplier: STR * {skill.damageMultiplier}</p>
          ) : null}
          <p>Range: {skill.range > 0 ? skill.range : 'Self'}</p>
          <p>Cost: {skill.cost} AP</p>
          <p>Cooldown: {skill.cooldown} turns</p>
        </Tooltip>
      );
    } else if (intelligenceBasedSkillIDs.includes(skill.id)) {
      return (
        <Tooltip width={450}>
          <h2>{skill.name}</h2>
          <p>{tagString}</p>
          <p>{skill.description}</p>
          {skill.damageMultiplier > 0 ? (
            <p>Damage Multiplier: INT * {skill.damageMultiplier}</p>
          ) : null}
          <p>Range: {skill.range > 0 ? skill.range : 'Self'}</p>
          <p>Cost: {skill.cost} AP</p>
          <p>Cooldown: {skill.cooldown} turns</p>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip width={450}>
          <h2>{skill.name}</h2>
          <p>{tagString}</p>
          <p>{skill.description}</p>
          <p>Range: {skill.range > 0 ? skill.range : 'Self'}</p>
          <p>Cost: {skill.cost} AP</p>
          <p>Cooldown: {skill.cooldown} turns</p>
        </Tooltip>
      );
    }
  };

  const addToEquippedSkills = (skill: ISkill) => {
    if (equippedSkills.length >= 6) return;

    setEquippedSkills((prevEquippedSkills) => [...prevEquippedSkills, skill]);
  };

  const removeFromEquippedSkills = (skill: ISkill) => {
    setEquippedSkills((prevEquippedSkills) => {
      const newEquippedSkills = prevEquippedSkills.filter(
        (equippedSkill) =>
          equippedSkill !== null && equippedSkill.id !== skill.id
      );

      return newEquippedSkills;
    });
  };

  const renderSkillsByCategory = (categoryName: string, skills: ISkill[]) => {
    return (
      <div className="mb-3">
        <p className="mb-2">{categoryName}</p>
        <div
          className="flex gap-1 justify-center items-center"
          // Grid layout
          // className={`grid gap-1 grid-cols-12`}
          // style={{
          //   gridTemplateRows: `repeat(${Math.ceil(skills.length / 12)}, ${ICON_SIZE}px)`,
          // }}
        >
          {skills.map((skill, index) => (
            <div
              key={'available_skill_' + index}
              id={`compendium_skill_${index + 1}`}
              className="bg-gray-500 relative"
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            >
              {skill !== null && (
                <>
                  <IconButton
                    onClick={() => addToEquippedSkills(skill)}
                    disabled={
                      equippedSkills.find((equippedSkill) => {
                        if (equippedSkill === null) return;
                        return equippedSkill.name === skill.name;
                      })
                        ? true
                        : false
                    }
                  >
                    <Icon
                      icon={skill.icon}
                      width={ICON_SIZE - 4}
                      height={ICON_SIZE - 4}
                    />
                  </IconButton>
                  {renderSkillButtonTooltip(skill)}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-zinc-900 p-5 border border-white h-full w-full">
      <div className="relative">
        <div
          className="absolute top-0 right-0 cursor-pointer text-red-500"
          onClick={() => setIsCompendiumOpen(false)}
        >
          X
        </div>
        <h2 className="mb-5 pb-3 w-full border-b">Compendium</h2>
      </div>

      <div className="mb-5 flex flex-col">
        {renderSkillsByCategory(
          'Strength-Based Damaging Skills',
          strengthBasedSkills
        )}
        {renderSkillsByCategory(
          'Intelligence-Based Damaging Skills',
          intelligenceBasedSkills
        )}
        {renderSkillsByCategory('Self Buff Skills', selfBuffSkills)}
        {renderSkillsByCategory(
          'Pure Crowd Control / Debuff Skills',
          crowdControlDebuffSkills
        )}
        {renderSkillsByCategory('Movement Skills', movementSkills)}
      </div>

      <div className="mb-6">
        <h3 className="mb-3">Equipped skills</h3>
        <div className="flex gap-1 justify-center">
          {equippedSkills.map((skill, index) => (
            <div
              key={'equipped_skill_' + index}
              id={`compendium_skill_slot_${index + 1}`}
              className="bg-gray-500 relative"
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            >
              {skill !== null && (
                <>
                  <IconButton onClick={() => removeFromEquippedSkills(skill)}>
                    <Icon
                      icon={skill.icon}
                      width={ICON_SIZE - 4}
                      height={ICON_SIZE - 4}
                    />
                  </IconButton>
                  {renderSkillButtonTooltip(skill)}
                </>
              )}
            </div>
          ))}
          {Array.from({ length: 6 - equippedSkills.length }).map((_, index) => (
            <div
              key={index}
              id={`compendium_skill_slot_${equippedSkills.length + index + 1}`}
              className="bg-gray-500"
              style={{ width: ICON_SIZE, height: ICON_SIZE }}
            />
          ))}
        </div>
      </div>

      <Button
        onClick={() => {
          // Update player skills
          setPlayerSkills(equippedSkills);

          // Close compendium
          setIsCompendiumOpen(false);

          // Update selected campaign
          if (!selectedCampaign) {
            console.error('Compendium button onClick: No selected campaign');
            return;
          }

          const newSelectedCampaign = {
            ...selectedCampaign,
            playerEquippedSkillIDs: equippedSkills.map((skill) => skill.id),
          };

          setSelectedCampaign(newSelectedCampaign);

          // Update campaigns
          const newCampaigns = campaigns.map((campaign) => {
            if (campaign.id === selectedCampaign.id) {
              return {
                ...campaign,
                playerEquippedSkillIDs: equippedSkills.map((skill) => skill.id),
              };
            }

            return campaign;
          });

          setCampaigns(newCampaigns);
        }}
      >
        Save Skills
      </Button>
    </div>
  );
};

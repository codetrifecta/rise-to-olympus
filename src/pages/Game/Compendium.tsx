import { FC, useEffect, useMemo, useState } from 'react';
import {
  crowdControlDebuffSkillIDs,
  intelligenceBasedSkillIDs,
  movementSkillIDs,
  selfBuffSkillIDs,
  SKILL_ID,
  SKILL_TAG,
  SKILLS,
  strengthBasedSkillIDs,
} from '../../constants/skill';
import { Icon } from './Icon';
import { IPassive, ISkill } from '../../types';
import { IconButton } from './IconButton';
import { Tooltip } from './Tooltip';
import { useGameStateStore } from '../../stores/game';
import { usePlayerStore } from '../../stores/player';
import { Button } from './Button';
import { useCampaignStore } from '../../stores/campaign';
import { useFloorStore } from '../../stores/floor';
import { FLOOR_ID } from '../../constants/floor';
import { ICON_ID } from '../../constants/icon';
import { PASSIVE_ID } from '../../constants/passive';
import { STARTING_SKILL_SLOTS } from '../../constants/game';

const ICON_SIZE = 50;

const enum COMPENDIUM_UNLOCKABLE {
  SKILL = 'SKILL',
  PASSIVE = 'PASSIVE',
}

export const Compendium: FC = () => {
  const { player, setPlayerSkills } = usePlayerStore();

  const [equippedSkills, setEquippedSkills] = useState<ISkill[]>(player.skills);

  const { isCompendiumOpen, setIsCompendiumOpen } = useGameStateStore();

  const { campaigns, selectedCampaign, setSelectedCampaign, setCampaigns } =
    useCampaignStore();

  const { floor } = useFloorStore();

  const [isAboutToUnlock, setIsAboutToUnlock] = useState<{
    unlockableType: COMPENDIUM_UNLOCKABLE;
    unlockableID: SKILL_ID | PASSIVE_ID;
  } | null>(null);

  // Compute max skill slots
  const maxSkillSlots = useMemo(() => {
    if (selectedCampaign === null) {
      console.error('Compendium maxSkillSlots: No selected campaign');
      return 0;
    }

    const skillSlotsPassive = selectedCampaign.passives.find(
      (passive) => passive.id === PASSIVE_ID.SKILL_SLOTS
    );

    if (!skillSlotsPassive) {
      console.error('Compendium maxSkillSlots: Skill slots passive not found');
      return 0;
    }

    return skillSlotsPassive.currentLevel + STARTING_SKILL_SLOTS;
  }, [selectedCampaign]);

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

  const renderSkillLockText: (skill: ISkill) => React.ReactNode = (
    skill: ISkill
  ) => {
    if (selectedCampaign === null) {
      console.error('Compendium renderSkillLockText: No selected campaign');
      return null;
    }

    // console.log(isSkillLocked(skill));
    if (isSkillLocked(skill)) {
      if (isAboutToUnlock?.unlockableID === skill.id) {
        if (selectedCampaign.divinity >= 100) {
          return (
            <>
              <h2 className="text-yellow-600">
                <strong>CLICK TO AGAIN TO UNLOCK</strong>
              </h2>
              <p>Cost: 100 Divinity</p>
            </>
          );
        } else {
          return (
            <>
              <h2 className="text-yellow-800">
                <strong>INSUFFICIENT DIVINITY</strong>
              </h2>
              <p>Cost: 100 Divinity</p>
            </>
          );
        }
      } else {
        return (
          <>
            <h2 className="text-red-800">
              <strong>LOCKED</strong>
            </h2>
            <p>Cost: 100 Divinity</p>
          </>
        );
      }
    }

    return null;
  };

  const renderPassiveLockText = (passive: IPassive) => {
    if (!selectedCampaign) {
      console.error('Compendium renderPassiveLockText: No selected campaign');
      return null;
    }

    const isMaxed = passive.currentLevel >= passive.maxLevel;

    if (!isMaxed) {
      if (isAboutToUnlock?.unlockableID === passive.id) {
        if (selectedCampaign.divinity >= 100) {
          return (
            <>
              <h2 className="text-yellow-600">
                <strong>CLICK TO AGAIN TO UNLOCK</strong>
              </h2>
              <p>Cost: 100 Divinity</p>
            </>
          );
        } else {
          return (
            <>
              <h2 className="text-yellow-800">
                <strong>INSUFFICIENT DIVINITY</strong>
              </h2>
              <p>Cost: 100 Divinity</p>
            </>
          );
        }
      } else {
        if (passive)
          return (
            <>
              <h2 className="text-red-800">
                <strong>LOCKED</strong>
              </h2>
              <p>Cost: 100 Divinity</p>
            </>
          );
      }
    }
  };

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

    const tooltipWidth = skill.description.length > 100 ? 550 : 400;

    // Strength-based skills vs Intelligence-based skills
    if (strengthBasedSkillIDs.includes(skill.id)) {
      return (
        <Tooltip width={tooltipWidth}>
          <div className="flex flex-col px-5 py-3">
            {renderSkillLockText(skill)}
            <h2 className="border-b mb-2 pb-1">{skill.name}</h2>
            <p>{tagString}</p>
            <p>{skill.description}</p>
            {skill.damageMultiplier > 0 ? (
              <p>Damage Multiplier: STR * {skill.damageMultiplier}</p>
            ) : null}
            <p>Range: {skill.range > 0 ? skill.range : 'Self'}</p>
            <p>Cost: {skill.cost} AP</p>
            <p>Cooldown: {skill.cooldown} turns</p>
          </div>
        </Tooltip>
      );
    } else if (intelligenceBasedSkillIDs.includes(skill.id)) {
      return (
        <Tooltip width={tooltipWidth}>
          <div className="flex flex-col px-5 py-3">
            {renderSkillLockText(skill)}
            <h2 className="border-b mb-2 pb-1">{skill.name}</h2>
            <p>{tagString}</p>
            <p>{skill.description}</p>
            {skill.damageMultiplier > 0 ? (
              <p>Damage Multiplier: INT * {skill.damageMultiplier}</p>
            ) : null}
            <p>Range: {skill.range > 0 ? skill.range : 'Self'}</p>
            <p>Cost: {skill.cost} AP</p>
            <p>Cooldown: {skill.cooldown} turns</p>
          </div>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip width={tooltipWidth}>
          <div className="flex flex-col px-5 py-3">
            {renderSkillLockText(skill)}
            <h2 className="border-b mb-2 pb-1">{skill.name}</h2>
            <p>{tagString}</p>
            <p>{skill.description}</p>
            <p>Range: {skill.range > 0 ? skill.range : 'Self'}</p>
            <p>Cost: {skill.cost} AP</p>
            <p>Cooldown: {skill.cooldown} turns</p>
          </div>
        </Tooltip>
      );
    }
  };

  const addToEquippedSkills = (skill: ISkill) => {
    if (equippedSkills.length >= maxSkillSlots) return;

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

  const isSkillLocked = (skill: ISkill) => {
    if (selectedCampaign === null) {
      console.error('Compendium skillIsNotUnlocked: No selected campaign');
      return true;
    }

    return !selectedCampaign.unlockedSkillIDs.find(
      (unlockedSkillID) => unlockedSkillID === skill.id
    );
  };

  const handleUnlockSkill = (skill: ISkill) => {
    if (selectedCampaign === null) {
      console.error('Compendium handleUnlockSkill: No selected campaign');
      return;
    }

    if (selectedCampaign.divinity < 100) {
      console.error('Compendium handleUnlockSkill: Insufficient divinity');
      return;
    }

    // Deduct divinity and add skill to unlocked skills list to both selected campaign and campaigns
    const newSelectedCampaign = {
      ...selectedCampaign,
      divinity: selectedCampaign.divinity - 100,
      unlockedSkillIDs: [...selectedCampaign.unlockedSkillIDs, skill.id],
    };

    setSelectedCampaign(newSelectedCampaign);

    const newCampaigns = campaigns.map((campaign) => {
      if (campaign.id === selectedCampaign.id) {
        return newSelectedCampaign;
      }

      return campaign;
    });

    setCampaigns(newCampaigns);

    // Unset isAboutToUnlockSkill
    setIsAboutToUnlock(null);
  };

  const handleUpgradePassive = (passive: IPassive) => {
    if (selectedCampaign === null) {
      console.error('Compendium handleUpgradePassive: No selected campaign');
      return;
    }

    let newSelectedCampaign = { ...selectedCampaign };
    let newCampaigns = [...campaigns];

    switch (passive.id) {
      case PASSIVE_ID.SKILL_SLOTS:
        {
          newSelectedCampaign = {
            ...selectedCampaign,
            divinity: selectedCampaign.divinity - 100,
            passives: selectedCampaign.passives.map((passive) => {
              if (passive.id === PASSIVE_ID.SKILL_SLOTS) {
                return {
                  ...passive,
                  currentLevel: passive.currentLevel + 1,
                };
              }

              return passive;
            }),
          };

          newCampaigns = campaigns.map((campaign) => {
            if (campaign.id === selectedCampaign.id) {
              return newSelectedCampaign;
            }

            return campaign;
          });
        }
        break;
      default:
        console.error('Compendium handleUpgradePassive: Unhandled passive ID');
        break;
    }

    setSelectedCampaign(newSelectedCampaign);
    setCampaigns(newCampaigns);

    // Unset isAboutToUnlockSkill
    setIsAboutToUnlock(null);
  };

  const renderSkillsByCategory = (categoryName: string, skills: ISkill[]) => {
    if (selectedCampaign === null) {
      console.error('Compendium renderSkillsByCategory: No selected campaign');
      return null;
    }

    return (
      <div className="mb-3 col-span-1">
        <p className="mb-2">{categoryName}</p>
        <div
          className="flex gap-1 flex-wrap justify-center items-center"
          // Grid layout
          // className={`grid gap-1 grid-cols-12`}
          // style={{
          //   gridTemplateRows: `repeat(${Math.ceil(skills.length / 12)}, ${ICON_SIZE}px)`,
          // }}
        >
          {skills.map((skill, index) => {
            const skillIsLocked = isSkillLocked(skill);

            return (
              <div
                key={'available_skill_' + index}
                id={`compendium_skill_${index + 1}`}
                className="bg-gray-500 relative"
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
              >
                {skill !== null && (
                  <div className="flex justify-center items-center">
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (
                          isSkillLocked(skill) &&
                          isAboutToUnlock?.unlockableID !== skill.id
                        ) {
                          setIsAboutToUnlock({
                            unlockableType: COMPENDIUM_UNLOCKABLE.SKILL,
                            unlockableID: skill.id,
                          });
                          return;
                        } else if (
                          isSkillLocked(skill) &&
                          isAboutToUnlock?.unlockableID === skill.id
                        ) {
                          console.log('Unlocking skill', skill);
                          handleUnlockSkill(skill);
                          return;
                        } else if (floor?.id === FLOOR_ID.TARTARUS_CAMP) {
                          // Only be able to equip skills in the camp
                          addToEquippedSkills(skill);
                        }
                      }}
                      disabled={
                        equippedSkills.find((equippedSkill) => {
                          if (equippedSkill === null) return;
                          return equippedSkill.name === skill.name;
                        })
                          ? true
                          : false
                      }
                      grayscale={skillIsLocked}
                      borderPulse={isAboutToUnlock?.unlockableID === skill.id}
                    >
                      <Icon
                        icon={skill.icon}
                        width={ICON_SIZE - 4}
                        height={ICON_SIZE - 4}
                      />
                    </IconButton>

                    {renderSkillButtonTooltip(skill)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className="bg-zinc-900 p-5 border border-white h-full w-full"
      onClick={() => {
        if (isAboutToUnlock) {
          setIsAboutToUnlock(null);
        }
      }}
    >
      <div className="relative">
        <div
          className="absolute top-0 right-0 cursor-pointer text-red-500"
          onClick={() => setIsCompendiumOpen(false)}
        >
          X
        </div>
        <h2 className="mb-5 pb-3 w-full border-b">Compendium</h2>
      </div>

      <div className="absolute ml-1">
        <h3>
          Divinity: {selectedCampaign ? selectedCampaign.divinity : 0}{' '}
          {isAboutToUnlock ? '- 100' : null}
        </h3>
      </div>

      <div className="relative mt-16 mb-5 grid grid-rows-3 grid-cols-2 gap-y-10 gap-x-5">
        {/* Row 1: Skills */}
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

        {/* Row 2: Passives */}
        <div className="mb-3 col-span-1">
          <p className="mb-2">Passives</p>
          <div
            className="flex gap-1 flex-wrap justify-center items-center"
            // Grid layout
            // className={`grid gap-1 grid-cols-12`}
            // style={{
            //   gridTemplateRows: `repeat(${Math.ceil(skills.length / 12)}, ${ICON_SIZE}px)`,
            // }}
          >
            {selectedCampaign?.passives.map((passive) => {
              return (
                <div
                  key={passive.id}
                  className="bg-gray-500 relative"
                  style={{ width: ICON_SIZE, height: ICON_SIZE }}
                >
                  <div className="flex justify-center items-center">
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (isAboutToUnlock?.unlockableID !== passive.id) {
                          setIsAboutToUnlock({
                            unlockableType: COMPENDIUM_UNLOCKABLE.PASSIVE,
                            unlockableID: passive.id,
                          });
                        } else if (
                          isAboutToUnlock?.unlockableID === passive.id
                        ) {
                          handleUpgradePassive(passive);
                        }
                      }}
                      disabled={passive.currentLevel >= passive.maxLevel}
                      borderPulse={
                        isAboutToUnlock?.unlockableType ===
                          COMPENDIUM_UNLOCKABLE.PASSIVE &&
                        isAboutToUnlock?.unlockableID === passive.id
                      }
                    >
                      <Icon
                        icon={ICON_ID.SKILLS}
                        width={ICON_SIZE - 4}
                        height={ICON_SIZE - 4}
                      />
                    </IconButton>
                    <Tooltip width={400}>
                      <div className="flex flex-col px-5 py-3">
                        {renderPassiveLockText(passive)}
                        <h2 className="border-b mb-2 pb-1">
                          Upgrade {passive.name}
                        </h2>
                        <p>
                          {passive.currentLevel} / {passive.maxLevel}
                        </p>
                        <p>{passive.description}</p>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-center ">
        <div>
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
                    <IconButton
                      onClick={() => {
                        // Only be able to remove equipped skills in the camp
                        if (selectedCampaign === null) {
                          console.error(
                            'Compendium equipped skill onClick: No selected campaign'
                          );
                          return;
                        }

                        if (!floor) {
                          console.error(
                            'Compendium equipped skill onClick: No floor'
                          );
                          return;
                        }

                        const doesPlayerHaveSkill =
                          player.skills.find(
                            (playerSkill) => playerSkill.id === skill.id
                          ) ?? false;

                        // Only be able to remove equipped skills in the camp
                        if (
                          floor.id !== FLOOR_ID.TARTARUS_CAMP &&
                          !doesPlayerHaveSkill
                        ) {
                          removeFromEquippedSkills(skill);
                        } else if (floor.id === FLOOR_ID.TARTARUS_CAMP) {
                          removeFromEquippedSkills(skill);
                        }
                      }}
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
            {Array.from({ length: maxSkillSlots - equippedSkills.length }).map(
              (_, index) => (
                <div
                  key={index}
                  id={`compendium_skill_slot_${equippedSkills.length + index + 1}`}
                  className="bg-gray-500"
                  style={{ width: ICON_SIZE, height: ICON_SIZE }}
                />
              )
            )}
          </div>
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

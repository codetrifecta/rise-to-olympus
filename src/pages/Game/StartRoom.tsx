import { Button } from '../../components/Button';

export const StartRoom = () => {
  return (
    <div>
      <h1>Start Room</h1>
      <p>Will be a small room where player starts a run</p>
      <Button onClick={() => console.log('play shopkeeper script')}>
        Shopkeeper
      </Button>
    </div>
  );
};

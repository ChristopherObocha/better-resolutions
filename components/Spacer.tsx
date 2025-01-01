import { View } from 'react-native';

type SpacerProps = {
  height?: number;
  width?: number;
};

const Spacer = ({ height, width }: SpacerProps) => {
  return <View style={{ height, width }} />;
};

export default Spacer;

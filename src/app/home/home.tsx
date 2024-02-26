import { FBPagePickedProperties } from "@/app/ts/types";
import { PageList } from "./page-list";

interface HomeContainerProps {
  FBPagesMetaData: FBPagePickedProperties[];
}

const HomeContainer: React.FC<HomeContainerProps> = ({ FBPagesMetaData }) => {
  return (
    <div>
      <PageList pageList={FBPagesMetaData} />
    </div>
  );
};

export default HomeContainer;

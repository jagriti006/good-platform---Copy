import { Anchor } from "antd";
import ApproveCard from "./ApproveCard";

const ValidationPreview = ({
  current,
  setCurrent,
  componentArr,
  getApprovalCardData,
  reWorkComment,
  setReWorkComment,
  sectionStatuses,
}) => {
  const handleClick = (e, link) => {
    e.preventDefault();
  };
  const getComponentByLink = () => {
    const item = componentArr.find((item) => item.link === current);
    if (item) {
      return item.component;
    }
  };
  return (
    <div className="containerfluid previewbgcoloroverview">
      <div className="row">
        <div className="col-3 anchorContainer anchorContainerMenu">
          <Anchor
            getContainer={() => document.getElementById("my-scroll-layout")}
            showInkInFixed={true}
            affix={false}
            onClick={handleClick}
            onChange={(link) => {
              if (link) setCurrent(link);
            }}
          >
            {componentArr.map((item) => (
              <Anchor.Link href={item.link} title={item.title} key={item.title} />
            ))}
          </Anchor>
        </div>
        <div className="col-6 scroll mrg-l-a" id="my-scroll-layout">
          {getComponentByLink()}
        </div>
        <div className="col-3">
          <ApproveCard
            {...getApprovalCardData()}
            sectionStatuses={sectionStatuses}
            reWorkComment={reWorkComment}
            setReWorkComment={setReWorkComment}
            current={current}
            getApprovalCardData={getApprovalCardData}
            componentArr={componentArr}
          />
        </div>
      </div>
    </div>
  );
};
export default ValidationPreview;

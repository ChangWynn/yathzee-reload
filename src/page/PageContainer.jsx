import style from "./PageContainer.module.css";

const PageContainer = ({ id, children }) => {
  return (
    <div id={id} className={style["container"]}>
      {children}
    </div>
  );
};

export default PageContainer;

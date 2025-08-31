import css from "./Loader.module.css";

function Loader() {
  return <p className={css.text}>Loading notes, please wait...</p>;
}

export default Loader;

// Alternative Loader
// import css from "./Loader.module.css";
//
//const Loader = () => {
//  return (
//    <div className={css.backdrop}>
//      <div className={css.loader} />
//    </div>
//  );
//};
//
//export default Loader;

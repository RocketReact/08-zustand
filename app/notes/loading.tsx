import css from "./loading.module.css";

export default function loading() {
  return (
    <div className={css.loadingBackdrop}>
      <div className={css.spinner}></div>
    </div>
  );
}

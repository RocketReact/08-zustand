import css from "./CardLoader.module.css";

const CardLoader = ({ textLabel }: { textLabel?: string }) => {
  return (
    <div className={css.card}>
      <div className={css.box}>{textLabel && <div>{textLabel}</div>}</div>
    </div>
  );
};

export default CardLoader;

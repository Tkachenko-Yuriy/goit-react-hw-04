import css from "./Button.module.css";
const Button = ({ filter, onClick }) => {
  return (
    <button onClick={() => onClick(filter)} className={css.filterButton}>
      {filter}
    </button>
  );
};

export default Button;

import Button from "../Button/Button";
import css from "./FilteredList.module.css";

const FilteredList = ({ filter, onClick }) => {
  return (
    <ul className={css.list}>
      {filter.map(({ category }) => {
        return (
          <li className={css.item} key={category}>
            <Button filter={category} onClick={onClick} />
          </li>
        );
      })}
    </ul>
  );
};

export default FilteredList;

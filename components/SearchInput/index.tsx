//style imports
import styles from './styles.module.css';

//package imports
import { useState } from 'react';

//image imports
import SearchIcon from './searchicon.svg';

//context imports
import { useAppContext } from '../../contexts/app';

type Props = {
  onSearch: (searchText: string) => void;
}

export const SearchInput = ({onSearch}: Props) => {

  const {tenant} = useAppContext();
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //if (event.code === 'Enter') {
    onSearch(searchValue);
    //}
  }

  return (
    <div className={styles.container} style={{borderColor: focused ? tenant?.mainColor : '#FFF'}}>
      <div className={styles.button} onClick={() => onSearch(searchValue)}>
        <SearchIcon color={tenant?.mainColor} />
      </div>
      <input 
        type="text"
        className={styles.input}
        placeholder="Digite o nome do produto"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyUp={handleKeyUp}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
//style imports
import styles from './styles.module.css';

//package imports
import { useState } from 'react';

//image imports
import EyeOn from './EyeOn.svg';
import EyeOff from './EyeOff.svg';

type Props = {
  color: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  password?: boolean;
}

export const InputField = ({color, placeholder, value, onChange, password}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div className={styles.container} style={{
        borderColor: focused ? color : '#F9F9FB',
        backgroundColor: focused ? '#FFF' : '#F9F9FB'
      }}
    >
      <input
        type={password ? (showPassword ? 'text' : 'password') : 'text'}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {password &&
        <div className={styles.showPassword} onClick={() => setShowPassword(!showPassword)}>
          {showPassword && <EyeOn color="#BBB"/>}
          {!showPassword && <EyeOff color="#BBB"/>}
        </div>
      }
    </div>
  );
}
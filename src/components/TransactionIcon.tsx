import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faApple,
} from '@fortawesome/free-brands-svg-icons';
import {
  faBullseye,
  faBasketShopping,
  faCarSide,
  faFilm,
  faReceipt,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import type { TransactionIconKey } from '../types';

const iconMap = {
  apple: faApple,
  basket: faBasketShopping,
  car: faCarSide,
  ikea: faReceipt,
  netflix: faFilm,
  sun: faSun,
  target: faBullseye,
} as const;

const backgroundMap = {
  apple: 'linear-gradient(180deg, #4f5054 0%, #2f3033 100%)',
  basket: 'linear-gradient(180deg, #0f766e 0%, #115e59 100%)',
  car: 'linear-gradient(180deg, #1d4ed8 0%, #1e3a8a 100%)',
  ikea: 'linear-gradient(180deg, #0b59c6 0%, #083c8a 100%)',
  netflix: 'linear-gradient(180deg, #b91c1c 0%, #7f1d1d 100%)',
  sun: 'linear-gradient(180deg, #ffd983 0%, #f59e0b 55%, #ef4444 100%)',
  target: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
} as const;

type TransactionIconProps = {
  iconKey: TransactionIconKey;
};

export function TransactionIcon({ iconKey }: TransactionIconProps) {
  return (
    <span
      className="transaction-icon"
      style={{ background: backgroundMap[iconKey] }}
      aria-hidden="true"
    >
      <FontAwesomeIcon
        icon={iconMap[iconKey]}
        color={iconKey === 'target' ? '#d90429' : '#ffffff'}
      />
    </span>
  );
}

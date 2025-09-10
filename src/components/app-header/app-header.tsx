import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/selectors/userSelectors';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector(selectUser)?.name} />
);

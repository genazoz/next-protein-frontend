import {useEffect} from 'react';
import { useRouter } from 'next/router';
import {FC} from "react";
import {selectUserData} from "../../features/user/userSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setShowAuthModal} from "../../features/settings/settingsSlice";
import PrivatePaths from "../../utils/privatePaths";

interface RouteGuardProps {
  children: JSX.Element,
}

const RouteGuard: FC<RouteGuardProps> = ({ children }): JSX.Element | null => {
  const router = useRouter();
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const path = router.asPath.split('?')[0];

    if (!userData && PrivatePaths.includes(path)) {
      if(router.pathname === '/profile'){
        router.push('/');
      } else {
        router.back();
        setTimeout(() => dispatch(setShowAuthModal(true)), 400)
      }
    }
  }, [userData, router.pathname])

  return children;
}

export default RouteGuard;
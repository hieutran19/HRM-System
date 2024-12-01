import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rolePermissions } from './PermissionTranslate';

interface AuthorizeProps {
  allowedPermission: string;
  children: React.ReactNode;
  isRouter?: boolean;
  permissionCondition?: boolean;
}

export const getUserPermissions = (): string[] => {
  const storedUser = localStorage.getItem('user');
  const permissionsList: string[] = [];

  if (storedUser) {
    const user = JSON.parse(storedUser);
    const userRoles = user?.roles || [];

    userRoles.forEach((role: string) => {
      const permissions = rolePermissions[role] || [];
      permissions.forEach(({ permission }) => {
        if (!permissionsList.includes(permission)) {
          permissionsList.push(permission);
        }
      });
    });
  }

  return permissionsList;
};

const Authorize = ({ allowedPermission, children, isRouter = false, permissionCondition = true }: AuthorizeProps) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userRoles = user?.roles || [];

      let hasUnconditionalPermission = false;
      let hasConditionalPermission = false;

      userRoles.forEach((role: string) => {
        const permissions = rolePermissions[role] || [];

        permissions.forEach(({ permission, requiresCondition }) => {
          if (permission === allowedPermission) {
            if (!requiresCondition) {
              hasUnconditionalPermission = true;
            } else if (requiresCondition && permissionCondition) {
              hasConditionalPermission = true;
            }
          }
        });
      });

      const hasPermission = hasUnconditionalPermission || hasConditionalPermission;

      if (hasPermission) {
        setIsAuthorized(true);
      } else {
        if (isRouter) {
          navigate('/unauthorized');
        }
        setIsAuthorized(false);
      }
    }
  }, [allowedPermission, permissionCondition]);

  return isAuthorized ? <>{children}</> : null;
};

export default Authorize;

from rest_framework.permissions import BasePermission

class HasRole(BasePermission):
    """
    Custom permission to only allow users with a specific role.
    """
    
    def has_permission(self, request, view):
        # Get the required role from the view
        required_role = getattr(view, 'required_role', None)
        
        if required_role:
            # Check if the user has the required role
            return request.user.user_roles.filter(role__name=required_role)
        return False
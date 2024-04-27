import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isStudent = false
    let isAlumni = false
    let isRecruter = false
    let isTeacher = false
    let isAdmin = false
    let status = "Student"

    if (token) {
        const decoded = jwtDecode(token)
        const { userId,email, roles, username} = decoded.UserInfo

        isStudent = roles.includes('Student')
        isAlumni = roles.includes('Alumni')
        isRecruter = roles.includes('Recruter')
        isTeacher = roles.includes('Teacher')
        isAdmin = roles.includes('Admin')

        if (isStudent) status = "Student"
        if (isAlumni) status = "Alumni"
        if (isRecruter) status = "Recruter"
        if (isTeacher) status = "Teacher"
        if (isAdmin) status = "Admin"

        return { userId,username,email, roles, status, isStudent, isAdmin,isAlumni,isRecruter, isTeacher}
    }

    return { userId: '',username: '', email: '', roles: [], isStudent, isAdmin,isAlumni,isRecruter,isTeacher, status }
}
export default useAuth
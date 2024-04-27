import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import HeaderClient from '../ClientComponent/Dashboard/HeaderClient';
import Footer from '../ClientComponent/Dashboard/Footer';
const DashLayout = () => {
    return (
        <>
           {/*  <DashHeader /> */}

        

          <Outlet /> 
           
           {/*  <DashFooter /> */}
        </>
    )
}
export default DashLayout
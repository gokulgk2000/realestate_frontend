import { Breadcrumbs } from "@material-tailwind/react";
 
 const Breadcrumb=() =>{
  return (
    <Breadcrumbs>
      <a href="/admin/Dashboard" className="opacity-60">
        Dashboard
      </a>
      <a href="/admin/userlist" className="opacity-60">
        Users
      </a>
      <a href="/admin/PropertyList" className="opacity-60">Properties</a>
    </Breadcrumbs>
  );
} 
export default Breadcrumb
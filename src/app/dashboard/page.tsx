import { ProductForm } from "../components/organisms/productForm";
import { DashboardCanvas } from "../components/template/dashboardCanva";
import { SpinnerLoader } from "../components/atom/spinner";
import { BusinessProfileForm } from "../components/organisms/businessProfileForm";

const Dashboard = async () => {
  return (
    <>
      <DashboardCanvas />
      <ProductForm />
      <BusinessProfileForm />
      <SpinnerLoader />
    </>
  );
};

export default Dashboard;

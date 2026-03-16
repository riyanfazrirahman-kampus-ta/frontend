import FormClassification from "@/components/Classification/FormClassification";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import PageWrapper from "../components/common/PageWrapper";

export default function PageClassification() {
  return (
    <PageWrapper>
      <PageMeta
        title="Klasifikasi"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Klasifikasi" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <FormClassification />
        </div>
      </div>
    </PageWrapper>
  );
}

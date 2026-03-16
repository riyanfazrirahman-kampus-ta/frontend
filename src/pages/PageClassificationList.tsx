import ClassificationList from "@/components/Classification/ClassificationList";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import PageWrapper from "../components/common/PageWrapper";

export default function PageClassificationList() {
  return (
    <PageWrapper>
      <PageMeta
        title="Daftar Klasifikasi"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Daftar Klasifikasi" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <ClassificationList />
        </div>
      </div>
    </PageWrapper>
  );
}

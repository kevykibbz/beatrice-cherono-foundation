// components/ui/breadcrumb.tsx
import { PageTypes } from "@/types/types";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/root/ui/breadcrumb";

const BreadcrumbHeader: React.FC<PageTypes> = ({ title = "" }) => {
  return (
    <div className="container mx-auto">
      <div className="page-header animate-fade-in animation-delay-100 rounded-xl">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 animate-slide-in-down">
            {title}
          </h1>

          <Breadcrumb className="animate-slide-in-down">
            <BreadcrumbList className="justify-center">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/"
                    className="text-white hover:text-primary transition duration-300"
                  >
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="#"
                    className="text-white hover:text-primary transition duration-300"
                  >
                    Pages
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white" />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-purple-600">
                  {title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbHeader;

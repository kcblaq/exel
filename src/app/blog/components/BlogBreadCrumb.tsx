import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BlogBreadCrumbProps {
  service?: string;
    postTitle?: string;
}

export const BlogBreadCrumb = ({ service, postTitle }: BlogBreadCrumbProps) => {
    return (
        <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink className="capitalize text-primary font-semibold " href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink className="capitalize text-primary font-semibold " href="/blog">Blog</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem  >
      <BreadcrumbPage className="capitalize text-primary font-semibold "> {service}</BreadcrumbPage>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage> {postTitle}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
    )
}
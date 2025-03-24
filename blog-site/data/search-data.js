import { nav_list } from "./nav_link";
import { policy_data } from "./policies_data";
import {
  about_service,
  eco_services,
  services_list_ecod,
} from "./service_data";
import { blogs, allBlogs } from "./blog_data";

// Extract policy pages from policy_data
const policyPages = Object.entries(policy_data)
  .filter(([key]) => key !== "policy_links")
  .map(([key, policy]) => ({
    title: policy.title,
    description: policy.meta_description,
    url: policy.url,
    type: "policy",
    keywords: policy.keywords,
    effective_date: policy.effective_date,
    content: policy.sections.map((section) => section.content).join(" "),
  }));

// Extract services from about_service
const aboutServices = about_service.map((service) => ({
  title: service.title,
  description: service.description,
  url: `/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`,
  type: "service",
  icon: service.icon,
  color: service.color,
}));

// Extract services from eco_services
const ecoServices = eco_services.map((service) => ({
  title: service.label,
  description: service.description,
  url: service.href,
  type: "service",
  image_url: service.image_url,
  icon: service.icon,
  cta: service.cta,
}));

// Extract all sub-services from services_list_ecod
const subServices = Object.entries(services_list_ecod).flatMap(
  ([category, services]) =>
    services.map((service) => ({
      title: service.label,
      description: service.description,
      url: `/services/${category}/${service.href}`,
      type: "sub-service",
      category: category,
      parent_service: services_list_ecod[category][0]?.label || category,
    }))
);

// Extract all blog posts from blogs
const mainBlogPosts = blogs.map((blog) => ({
  title: blog.title,
  description: blog.description,
  url: `/blog${blog.slug}`,
  type: "blog",
  category: blog.category,
  image: blog.image,
}));

// Extract all blog posts from allBlogs
const categorizedBlogPosts = Object.values(allBlogs).flatMap((categoryPosts) =>
  categoryPosts.map((post) => ({
    title: post.title,
    description: post.description,
    url: `/blog${post.slug}`,
    type: "blog",
    category: post.category,
    image: post.imageSrc,
  }))
);

// Combine all blog posts
const allBlogPosts = [...mainBlogPosts, ...categorizedBlogPosts];

export const searchData = [
  {
    title: "Home",
    description: "Welcome to our homepage",
    url: "/",
    type: "page",
  },
  {
    title: "Blogs",
    description: "Read our latest blog posts",
    url: "/blog-posts",
    type: "page",
  },
  {
    title: "Services",
    description: "View all our services",
    url: "/services",
    type: "page",
  },
  ...(nav_list
    .find((item) => item.label === "Services")
    ?.subpages?.map((service) => ({
      title: service.label,
      description: `${service.label} services`,
      url: `/services/${service.slug}`,
      type: "service",
    })) || []),
  {
    title: "Disclaimer",
    description: "Legal disclaimer information",
    url: "/disclaimer",
    type: "page",
  },
  {
    title: "About Us",
    description: "Learn more about our company",
    url: "/about-us",
    type: "page",
  },
  {
    title: "Contact",
    description: "Get in touch with us",
    url: "/contact",
    type: "page",
  },
  // Add all policy pages
  ...policyPages,
  // Add all services
  ...aboutServices,
  ...ecoServices,
  // Add all sub-services
  ...subServices,
  // Add all blog posts
  ...allBlogPosts,
].filter(Boolean);

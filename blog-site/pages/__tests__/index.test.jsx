import { render, screen, act } from "@testing-library/react";
import Home from "../index";
import { useRouter } from "next/router";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock(
  "../components/Reusable/seo_head",
  () =>
    ({ schemaData, ...props }) => (
      <>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <link rel="canonical" href={props.canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </>
    )
);

// Mock all dynamic imports
jest.mock("../components/Home/hero-section", () => () => (
  <section data-testid="hero-section">Hero Section</section>
));

jest.mock("../components/Home/services-section", () => () => (
  <section data-testid="services-section">Services Section</section>
));

jest.mock("../components/Home/shopify-section", () => () => (
  <section data-testid="shopify-section">Shopify Section</section>
));

jest.mock("../components/Home/blog-section", () => () => (
  <section data-testid="blog-section">Blog Section</section>
));

jest.mock("../components/Home/digi-mark-section", () => () => (
  <section data-testid="digital-marketing-section">
    Digital Marketing Section
  </section>
));

jest.mock("../components/Home/client-testi-section", () => () => (
  <section data-testid="testimonials-section">Testimonials Section</section>
));

jest.mock("../components/Home/faq-ecod", () => () => (
  <section data-testid="faq-section">FAQ Section</section>
));

jest.mock("../components/Home/call-to-action", () => () => (
  <section data-testid="cta-section">CTA Section</section>
));

// Mock window.scrollTo
beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe("Home Page", () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      pathname: "/",
      push: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByTestId("home-container")).toBeInTheDocument();
  });

  it("contains all main sections", async () => {
    await act(async () => {
      render(<Home />);
    });

    // Check for all sections
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("services-section")).toBeInTheDocument();
    expect(screen.getByTestId("shopify-section")).toBeInTheDocument();
    expect(screen.getByTestId("blog-section")).toBeInTheDocument();
    expect(screen.getByTestId("digital-marketing-section")).toBeInTheDocument();
    expect(screen.getByTestId("testimonials-section")).toBeInTheDocument();
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
  });

  it("sets proper SEO metadata", async () => {
    await act(async () => {
      render(<Home />);
    });

    // Check for important SEO elements
    expect(document.title).toBe(
      "Home - ECOD | Web Development, SEO & Digital Marketing"
    );

    // Check for meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute(
      "content",
      "Welcome to ECOD! We provide expert web development, SEO, and digital marketing services to grow your business. Get tailored solutions from industry experts."
    );

    // Check canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toHaveAttribute("href", "https://ecoddigital.com");
  });

  it("scrolls to top on route change", async () => {
    const mockScrollTo = jest.fn();
    window.scrollTo = mockScrollTo;

    await act(async () => {
      render(<Home />);
    });

    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("matches snapshot", async () => {
    let container;
    await act(async () => {
      container = render(<Home />).container;
    });
    expect(container).toMatchSnapshot();
  });

  it("renders schema markup", async () => {
    await act(async () => {
      render(<Home />);
    });

    const schemaScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(schemaScript).toBeInTheDocument();

    const schemaData = JSON.parse(schemaScript.textContent);
    expect(schemaData["@type"]).toBe("Organization");
    expect(schemaData.name).toBe("ECOD");
    expect(schemaData.url).toBe("https://ecoddigital.com");
  });
});

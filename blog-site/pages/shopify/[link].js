import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { shopifyServicesContent } from "@/data/shopify";
import Image from "next/image";

const ShopifyServicePage = () => {
  const router = useRouter();
  const { link } = router.query;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !link || !shopifyServicesContent[link]) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold dark:text-white">
            {!isMounted ? "Loading..." : "Service not found"}
          </h1>
          {isMounted && (
            <button
              onClick={() => router.push("/services")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse All Services
            </button>
          )}
        </div>
      </div>
    );
  }

  const service = shopifyServicesContent[link];

  return (
    <>
      <Head>
        <title>{service.seoTitle || service.title} | Your Company</title>
        <meta
          name="description"
          content={service.seoDescription || service.description}
        />
        {service.keywords && (
          <meta name="keywords" content={service.keywords.join(", ")} />
        )}
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Service Header */}
        <header className="mb-12 text-center">
          {service.icon && (
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/50">
              <Image
                src={service.icon}
                alt=""
                width={32}
                height={32}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
          )}
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {service.description}
          </p>
        </header>

        {/* Service Content */}
        <div className="space-y-16">
          {service.content.map((section, index) => (
            <section
              key={`${section.sectionTitle}-${index}`}
              className="scroll-mt-24"
              id={`section-${index}`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  {section.icon && (
                    <Image
                      src={section.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400"
                    />
                  )}
                  {section.sectionTitle}
                </h2>

                {/* Section Content */}
                <div className="prose prose-lg max-w-none dark:prose-invert prose-p:text-gray-600 dark:prose-p:text-gray-300">
                  {/* Features Grid */}
                  {section.sectionContent?.features && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                      {section.sectionContent.features.map((feature, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
                        >
                          {feature.icon && (
                            <Image
                              src={feature.icon}
                              alt=""
                              width={20}
                              height={20}
                              className="w-5 h-5 mb-2 text-blue-500"
                            />
                          )}
                          <h3 className="font-semibold text-lg">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stats Display */}
                  {section.stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {section.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg text-center"
                        >
                          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {stat.value}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Process Steps */}
                  {section.processSteps && (
                    <div className="space-y-6 mb-8">
                      <h3 className="text-xl font-semibold">Our Process</h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        {section.processSteps.map((step, i) => (
                          <div
                            key={i}
                            className="border-l-4 border-blue-500 pl-4 py-2"
                          >
                            <div className="flex items-center mb-2">
                              {step.icon && (
                                <Image
                                  src={step.icon}
                                  alt=""
                                  width={20}
                                  height={20}
                                  className="w-5 h-5 mr-2 text-blue-500"
                                />
                              )}
                              <h4 className="font-medium">{step.name}</h4>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                              {step.details}
                            </p>
                            {step.duration && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Duration: {step.duration}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Case Study */}
                  {section.caseStudy && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8 border border-blue-100 dark:border-blue-900/50">
                      <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                        Case Study: {section.caseStudy.client}
                      </h3>
                      {section.caseStudy.image && (
                        <div className="mb-4">
                          <Image
                            src={section.caseStudy.image}
                            alt={`Case study for ${section.caseStudy.client}`}
                            width={800}
                            height={450}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium mb-2">Results:</h4>
                          <ul className="space-y-2">
                            {Array.isArray(section.caseStudy.results) ? (
                              section.caseStudy.results.map((result, i) => (
                                <li key={i} className="flex items-start">
                                  <svg
                                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  {typeof result === "string" ? (
                                    result
                                  ) : (
                                    <>
                                      {result.metric}:{" "}
                                      {result.before && `${result.before} → `}
                                      {result.after || result.change}
                                    </>
                                  )}
                                </li>
                              ))
                            ) : (
                              <p>{section.caseStudy.results}</p>
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Solution:</h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            {section.caseStudy.solution}
                          </p>
                          {section.caseStudy.techniques && (
                            <div className="mt-3">
                              <h5 className="font-medium mb-1">
                                Techniques Used:
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {section.caseStudy.techniques.map((tech, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                  >
                                    {tech.icon && (
                                      <Image
                                        src={tech.icon}
                                        alt=""
                                        width={12}
                                        height={12}
                                        className="w-3 h-3 mr-1"
                                      />
                                    )}
                                    {tech.name || tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Checklist */}
                  {section.checklist && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">
                        {`What's Included`}
                      </h3>
                      <div className="space-y-4">
                        {section.checklist.map((category, i) => (
                          <div key={i}>
                            {category.category && (
                              <h4 className="font-medium mb-2">
                                {category.category}
                              </h4>
                            )}
                            <ul className="space-y-2">
                              {category.items?.map((item, j) => (
                                <li key={j} className="flex items-start">
                                  {item.icon && (
                                    <Image
                                      src={item.icon}
                                      alt=""
                                      width={16}
                                      height={16}
                                      className="w-4 h-4 mt-1 mr-2 text-blue-500 flex-shrink-0"
                                    />
                                  )}
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    {item.details && (
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {item.details}
                                      </p>
                                    )}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  {section.timeline && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">
                        Project Timeline
                      </h3>
                      <div className="space-y-6">
                        {section.timeline.phases?.map((phase, i) => (
                          <div key={i} className="relative pl-8">
                            <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                            <div className="absolute left-2 top-4 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                            <div>
                              <h4 className="font-medium">
                                {phase.name}{" "}
                                <span className="text-sm text-gray-500 ml-2">
                                  ({phase.duration})
                                </span>
                              </h4>
                              <ul className="mt-2 space-y-1">
                                {phase.tasks?.map((task, j) => (
                                  <li key={j} className="flex items-start">
                                    <svg
                                      className="h-4 w-4 text-green-500 mr-1.5 mt-0.5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                        {section.timeline.guarantee && (
                          <div className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 p-4">
                            <p className="text-yellow-700 dark:text-yellow-300">
                              <strong>Guarantee:</strong>{" "}
                              {section.timeline.guarantee}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Technical Specs */}
                  {section.technicalSpecs && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">
                        Technical Specifications
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        {section.technicalSpecs.foundation && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Foundation</h4>
                            <p>{section.technicalSpecs.foundation}</p>
                          </div>
                        )}
                        {section.technicalSpecs.components && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Key Components</h4>
                            <ul className="space-y-2">
                              {section.technicalSpecs.components.map(
                                (component, i) => (
                                  <li key={i} className="flex items-start">
                                    <svg
                                      className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    {component}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                        {section.technicalSpecs.performance && (
                          <div>
                            <h4 className="font-medium mb-2">
                              Performance Targets
                            </h4>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <p className="font-medium">
                                  Load Time:{" "}
                                  <span className="font-normal">
                                    {section.technicalSpecs.performance.target}
                                  </span>
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Metrics:</p>
                                <ul className="space-y-1">
                                  {section.technicalSpecs.performance.metrics?.map(
                                    (metric, i) => (
                                      <li key={i} className="flex items-start">
                                        <svg
                                          className="h-4 w-4 text-green-500 mr-1.5 mt-0.5"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                        {metric}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Optimization Stats */}
                  {section.optimizationStats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {section.optimizationStats.map((stat, i) => (
                        <div
                          key={i}
                          className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg text-center"
                        >
                          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                            {stat.value}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Techniques */}
                  {section.techniques && (
                    <div className="grid gap-4 md:grid-cols-2 mb-8">
                      {section.techniques.map((tech, i) => (
                        <div
                          key={i}
                          className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-center mb-2">
                            {tech.icon && (
                              <Image
                                src={tech.icon}
                                alt=""
                                width={20}
                                height={20}
                                className="w-5 h-5 mr-2 text-blue-500"
                              />
                            )}
                            <h4 className="font-medium">{tech.name}</h4>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            <strong>Impact:</strong> {tech.impact}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick Wins */}
                  {section.quickWins && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">Quick Wins</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {section.quickWins.map((win, i) => (
                          <div key={i} className="flex items-start">
                            {win.icon && (
                              <Image
                                src={win.icon}
                                alt=""
                                width={20}
                                height={20}
                                className="w-5 h-5 mr-3 mt-0.5 text-blue-500"
                              />
                            )}
                            <div>
                              <p className="font-medium">{win.name}</p>
                              {win.impact && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Impact: {win.impact}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tools */}
                  {section.tools && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">
                        Tools We Use
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {section.tools.map((tool, i) => (
                          <div
                            key={i}
                            className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg"
                          >
                            {tool.icon && (
                              <Image
                                src={tool.icon}
                                alt=""
                                width={20}
                                height={20}
                                className="w-5 h-5 mr-2"
                              />
                            )}
                            <span>{tool.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Flows */}
                  {section.flows && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">
                        Email Flows
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {section.flows.map((flow, i) => (
                          <div
                            key={i}
                            className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                          >
                            <div className="flex items-center mb-2">
                              {flow.icon && (
                                <Image
                                  src={flow.icon}
                                  alt=""
                                  width={20}
                                  height={20}
                                  className="w-5 h-5 mr-2 text-blue-500"
                                />
                              )}
                              <h4 className="font-medium">{flow.type}</h4>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                              <strong>ROI:</strong> {flow.roi || flow.recovery}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Pricing Section */}
        {service.pricing && (
          <section className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Pricing Plans
              </h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Choose the package that fits your needs
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {service.pricing.packages?.map((pkg, i) => (
                <div
                  key={i}
                  className={`rounded-xl shadow-sm border ${
                    pkg.popular
                      ? "ring-2 ring-blue-500 dark:ring-blue-400 border-blue-100 dark:border-blue-900"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="p-6">
                    {pkg.popular && (
                      <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {pkg.name}
                    </h3>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
                      {pkg.price}
                    </p>
                    {pkg.bestFor && (
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Best for: {pkg.bestFor}
                      </p>
                    )}
                    <ul className="mt-6 space-y-3">
                      {pkg.includes.map((item, j) => (
                        <li key={j} className="flex items-start">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`mt-8 w-full px-4 py-3 rounded-md font-medium ${
                        pkg.popular
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                      }`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to get started?
          </h2>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Contact Our Team
            </button>
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopifyServicePage;

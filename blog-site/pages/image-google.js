import Image from "next/image";
import { useState, useEffect } from "react";

function ServiceImages({ service }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`/api/google_image/get-image?query=${service}`)
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching images:", error));
  }, [service]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.length > 0 ? (
        images.map((img, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={img.link}
              alt={img.title}
              width={300}
              height={200}
              className="object-cover"
            />
          </div>
        ))
      ) : (
        <p>No images found for {service}</p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Our Services</h1>
      <h1>Web Development</h1>
      <ServiceImages service="web development" />
      <h1>SEO</h1>
      <ServiceImages service="SEO" />
      <h1>Shopify</h1>
      <ServiceImages service="shopify" />
      <h1>Digital Marketing</h1>
      <ServiceImages service="digital marketing" />
      <h1>Branding</h1>
      <ServiceImages service="branding" />
      <h1>Content Marketing</h1>
      <ServiceImages service="content marketing" />
      <h1>Email Marketing</h1>
      <ServiceImages service="email marketing" />
      <h1>UX/UI Design</h1>
      <ServiceImages service="ux/ui design" />
      <h1>Google | Meta Ads</h1>
      <ServiceImages service="Google and Meta Ads" />
      <h1>Graphic and Logo Design</h1>
      <ServiceImages service="graphic and logo design" />
    </div>
  );
}

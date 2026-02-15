import { ArrowRight } from 'lucide-react';

export function Services() {
  const services = [
    {
      number: "1",
      title: "GRAPHIC DESIGN",
      description: "From logos and brand kits to eye-catching flyers, posters, and social media content, we craft visuals that capture attention and communicate your message effectively. Every design is tailored to your brand's unique personality and goals.",
      image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MDYyOTM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      number: "2",
      title: "BRAND/PRODUCT DESIGN",
      description: "Building a brand is more than just a logo—it's creating an identity that resonates. We develop comprehensive branding strategies, identity systems, and packaging designs that make your products stand out and leave a lasting impression.",
      image: "https://images.unsplash.com/photo-1677890465835-ab8c5c621771?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGRlc2lnbiUyMG1vY2t1cHxlbnwxfHx8fDE3NzA2MTgzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      number: "3",
      title: "SNAPCHAT LENS/AR DEVELOPMENT",
      description: "Step into the future with custom Snapchat lenses and augmented reality experiences. We create engaging, interactive AR content that brings your brand to life in ways your audience has never experienced before.",
      image: "https://images.unsplash.com/photo-1545579833-02a4c62797f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWdtZW50ZWQlMjByZWFsaXR5JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzA2MTIyOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MDYyOTM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Services Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl text-center mb-16">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.number} className="group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition duration-300">
                {/* Image */}
                <div className="h-64 overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl text-blue-400">{service.number}</span>
                    <h3 className="text-xl">{service.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition">
                    More Info <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

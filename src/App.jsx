import * as THREE from 'three';
import './App.css'
import React, { useEffect , useRef ,useState} from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './index.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function App() {
  const canvasRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf4f4f4);

    // Camera (Perspective for natural look)
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(8, 6, 12);
    camera.lookAt(0, 20, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false
    });
    renderer.setClearColor(0xf4f4f4, 1);

    // Responsiveness
    const setRendererSize = () => {
      if (!canvasRef.current || !canvasRef.current.parentElement) return;
      const parent = canvasRef.current.parentElement;
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    setRendererSize();

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.enablePan = false;
    controls.target.set(0, 2.5, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(40, 60, 40);
    directionalLight.castShadow = false;
    scene.add(directionalLight);

    // Model loader
    const loader = new GLTFLoader();
    loader.load('/3d/machinedis2.glb',
      (gltf) => {
        gltf.scene.position.set(0, -2, 0);
        gltf.scene.rotation.set(0,180,0)
        gltf.scene.scale.set(1, 1, 1); // Normal scale
        scene.add(gltf.scene);

        // Grid
        const grid = new THREE.GridHelper(20, 20, 0xcccccc, 0xcccccc);
        grid.position.y = -2;
        scene.add(grid);
      }
    );

    // Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => setRendererSize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
    {/* Navigation */}
    <header className="sticky top-0 bg-white bg-opacity-95 shadow-md z-50 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/assets/hib_logo.svg" alt="Hibryd Logo" className="h-8 w-8 drop-shadow" />
          <p className="text-xl font-bold text-gray-900">Hibryd</p>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li><a href="#features" className="hover:text-green-600 transition-colors">Features</a></li>
            <li><a href="#specs" className="hover:text-green-600 transition-colors">Specifications</a></li>
            <li><a href="#benefits" className="hover:text-green-600 transition-colors">Benefits</a></li>
            <li><a href="#applications" className="hover:text-green-600 transition-colors">Applications</a></li>
            <li><a href="#contact" className="hover:text-green-600 transition-colors">Contact</a></li>
          </ul>
        </nav>
        
        <button className="hidden md:block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Get a Quote
        </button>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-3 shadow-lg">
          <ul className="flex flex-col space-y-3 text-gray-700">
            <li><a href="#features" className="block hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Features</a></li>
            <li><a href="#specs" className="block hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Specifications</a></li>
            <li><a href="#benefits" className="block hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Benefits</a></li>
            <li><a href="#applications" className="block hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Applications</a></li>
            <li><a href="#contact" className="block hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            <li>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium mt-2">
                Get a Quote
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>

    <main className="flex-1">
      {/* Hero Section */}
      <section 
        id="hero"
        className="relative bg-gray-900 py-24 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img src="/api/placeholder/1920/1080" alt="Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-green-500 bg-opacity-20 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">#1 Energy Efficient Food Processing</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              AirFactoryfryer <span className="text-green-500">FERNO</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-gray-300 mb-6">
              Industrial Air Fryer – Revolutionize Your Food Production
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8">
              Introducing the AirFactoryfryer FERNO – the ultimate industrial air fryer engineered for high-volume food processing with efficiency, consistency, and health-conscious production.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#contact" className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-lg">
                Request a Demo
              </a>
              <a href="#specs" className="bg-white text-gray-800 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                View Specifications
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <p className="text-4xl font-bold text-green-600 mb-2">50kg/h</p>
              <p className="text-gray-500">Processing Capacity</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <p className="text-4xl font-bold text-green-600 mb-2">315°C</p>
              <p className="text-gray-500">Maximum Temperature</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <p className="text-4xl font-bold text-green-600 mb-2">45%</p>
              <p className="text-gray-500">Energy Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="flex justify-center items-center py-16 bg-gray-50">
        <div className="container flex justify-center items-center px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center lg:p-[10px]">
            <div className="md:w-full flex flex-col">
              <span className="inline-block w-fit bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full mb-2">Quality Features</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
              <p className="text-gray-600 mb-6">
                <strong>Explore the core functionalities that set FERNO apart:</strong>
              </p>
              <ul className="space-y-3">
                {[
                  "High-capacity continuous frying for large-scale operations",
                  "Advanced hot air circulation for even, golden results every batch",
                  "Intuitive touchscreen controls and programmable recipes",
                  "Energy-efficient design and easy-clean construction",
                  "Food-safe, durable stainless steel build",
                  "Automated cleaning system for minimal downtime"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 mt-1 mr-2 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-full">
              <div className="bg-white p-4 rounded-xl">
                <canvas id="app_canvas" ref={canvasRef} className="w-full h-full block rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full mb-2">Why Choose FERNO</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Benefits of FERNO</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our industrial air fryer offers numerous advantages for your production line
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Healthier Food Production",
                description: "Reduce oil usage and create healthier fried foods that meet consumer demand."
              },
              {
                title: "Cost Efficiency",
                description: "Lower operational costs with reduced oil consumption and energy-efficient design."
              },
              {
                title: "Consistent Quality",
                description: "Achieve perfectly crispy results every time with advanced hot air circulation."
              },
              {
                title: "Reduced Downtime",
                description: "Automated cleaning and remote diagnostics keep your production running smoothly."
              },
              {
                title: "Scalable & Flexible",
                description: "Modular design adapts to your growing production needs."
              },
              {
                title: "Safer Work Environment",
                description: "Oil mist filtration and ergonomic controls improve operator safety."
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border-t-4 border-green-500 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specs" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full mb-2">Technical Details</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Specifications</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Comprehensive technical information about the AirFactoryfryer FERNO
            </p>
          </div>
          
          <div className="overflow-x-auto bg-gray-50 rounded-xl shadow-lg max-w-4xl mx-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">Feature</th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { feature: "Capacity", spec: "20 kg/hour (expandable to 40 kg/hour)" },
                  { feature: "Power Consumption", spec: "45 kW (energy-saving mode available)" },
                  { feature: "Dimensions", spec: "3m x 2m x 2.5m (customizable)" },
                  { feature: "Material", spec: "Food-grade Stainless Steel (AISI 304)" },
                  { feature: "Control System", spec: "15" ,Touchscreen:"PLC, IoT-enabled" },
                  { feature: "Temperature Range", spec: "50°C – 250°C (multi-zone)" },
                  { feature: "Connectivity", spec: "Ethernet, Wi-Fi, Remote Monitoring" },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="py-3 px-6 text-gray-900 font-medium">{item.feature}</td>
                    <td className="py-3 px-6 text-gray-700">{item.spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section id="applications" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full mb-2">Use Cases</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Typical Applications</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Discover how FERNO can transform various food production processes
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { number: "01", title: "Potato products" },
              { number: "02", title: "Plant-based proteins" },
              { number: "03", title: "Coated foods" },
              { number: "04", title: "Bakery items" }
            ].map((app, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <p className="text-green-500 text-lg font-bold mb-1">{app.number}</p>
                <h3 className="text-gray-900 font-medium mb-2">{app.title}</h3>
                <a href="#" className="text-sm text-green-600 hover:text-green-700 flex items-center">
                  View Details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our industrial air fryer is versatile and can be customized for specific production requirements, including potato chips, French fries, plant-based protein products, coated foods, bakery snacks, and many more applications.
            </p>
            <a href="#contact" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
              Get a custom solution
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Environmental Section */}
      <section className="flex py-16 bg-gray-900 text-white items-center justify-center">
        <div className="container mx-auto px-4 items-center justify-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">It's time to support zero pollution,<br />with renewable resources</h2>
              <p className="text-gray-300 mb-6">
                By increasing the effectiveness and efficiency of industrial food processing, we're helping companies reduce their environmental footprint while improving product quality.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-300">Support for the latest technology</span>
                </div>
              </div>
              <button className="mt-6 bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Get in touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full mb-2">Get Started</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Ready to revolutionize your food production with FERNO? Contact us today for a personalized quote and consultation.
            </p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <form className="bg-gray-50 rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                  placeholder="Tell us about your needs"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
           <img src="/assets/hib_logo.svg" alt="Hibryd Logo" className="h-8 w-8 drop-shadow" />
            <span className="text-xl font-bold">Hibryd</span>
          </div>
          
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
              <li><a href="#" className="hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#features" className="hover:text-green-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-green-400 transition-colors">Contact</a></li>
            </ul>
          </nav>
          
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Hibryd. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
  )
}

export default App

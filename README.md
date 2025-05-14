# Unity Nodes - Blockchain Node Validation Portfolio

![Unity Nodes Banner](/public/interconnected-blocks.png)

## Overview

Unity Nodes is a professional portfolio website showcasing blockchain node validation services across multiple networks. The site features a modern, responsive design with a polymorphic neon aesthetic and interactive elements that highlight the technical expertise and reliability of the validation services.

## Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Interactive Elements**: Animated server visualization, interactive blockchain validation process, and dynamic ecosystem tabs
- **Cross-Platform Optimization**: Performance optimizations for various devices and browsers
- **Data-Driven Content**: JSON-based data structure for easy content updates
- **Modern UI**: Neon-themed design with polymorphic elements and smooth animations

## Technologies Used

- **Next.js 14**: React framework for server-side rendering and static site generation
- **TypeScript**: Type-safe JavaScript for improved developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for React
- **Lucide React**: Icon library
- **Shadcn/UI**: Component library based on Radix UI

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/unity-nodes-portfolio.git
   cd unity-nodes-portfolio
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

\`\`\`
unity-nodes-portfolio/
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page component
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ecosystems.tsx    # Blockchain ecosystems component
│   ├── footer.tsx        # Footer component
│   ├── hero.tsx          # Hero section component
│   ├── navbar.tsx        # Navigation component
│   ├── partners.tsx      # Partners section component
│   ├── server-animation.tsx # Server animation component
│   ├── services.tsx      # Services section component
│   ├── stats.tsx         # Statistics component
│   ├── validation-process.tsx # Validation process component
│   └── ui/               # UI components from shadcn/ui
├── data/                 # Data files
│   └── ecosystems/       # Ecosystem data
│       └── data.ts       # Ecosystem data for different categories
├── hooks/                # Custom React hooks
│   ├── use-device-type.tsx # Device type detection hook
│   └── use-touch-device.tsx # Touch device detection hook
├── public/               # Static assets
│   └── *.png             # Images and logos
└── tailwind.config.ts    # Tailwind CSS configuration
\`\`\`

## Customization

### Updating Ecosystem Data

To update the blockchain ecosystems displayed on the site, edit the data files in the `data/ecosystems/` directory:

\`\`\`typescript
// data/ecosystems/data.ts
export const mainnetData: EcosystemItem[] = [
  {
    name: "Blockchain Name",
    image: "/path-to-logo.png",
    description: "Description of the blockchain.",
    buttons: [
      {
        label: "Button Label",
        url: "https://example.com",
        color: "primary" // or "secondary"
      },
      // Add more buttons as needed
    ]
  },
  // Add more blockchain entries as needed
]
\`\`\`

### Adding New Sections

To add a new section to the site:

1. Create a new component in the `components/` directory
2. Import and add the component to `app/page.tsx`
3. Style the component using Tailwind CSS classes

### Changing the Theme

To modify the color scheme:

1. Edit the color variables in `app/globals.css`
2. Update the `tailwind.config.ts` file if adding new colors

## Deployment

This project can be deployed on Vercel with zero configuration:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Deploy

For other platforms, build the project first:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

Then deploy the generated `.next` directory according to your hosting provider's instructions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries about node validation services or this project, please contact:

- Website: [unitynodes.com](https://unitynodes.com)
- Email: contact@unitynodes.com
- Twitter: [@unitynodes](https://twitter.com/unitynodes)
- Discord: [Unity Nodes Community](https://discord.gg/unitynodes)

---

Built with ❤️ by UnityNodes Team

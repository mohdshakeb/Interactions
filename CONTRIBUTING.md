# Contributing to Web Interactions Demo

Thank you for your interest in contributing to this project! Here are some guidelines to help you get started.

## Code of Conduct

Please be respectful and considerate to all contributors. We want to create a welcoming and inclusive environment.

## How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

### Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write self-documenting code with meaningful variable and function names
- Add comments for complex logic

### Creating New Interactions

When adding a new interaction demo:

1. Create a new folder in `src/app` for your interaction
2. Add it to the main page navigation
3. Document the interaction in the README
4. Ensure it works on both desktop and mobile devices

### Running Tests

Make sure your code passes all tests before submitting:

```bash
npm run lint
npm run build
```

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. The PR should work in all modern browsers (Chrome, Firefox, Safari, Edge)
3. Link any relevant issues in your PR description
4. Your PR needs to be reviewed and approved before merging

Thank you for your contributions! 
# Test Configuration

This document explains the test configuration structure and how to customize it for your environment.

## Configuration Structure

### File Location
```
tests/config/testConfig.ts
```

### Configuration Options

```typescript
export const testConfig = {
  // Base URL for the application
  baseUrl: string;

  // Test user credentials
  credentials: {
    username: string;
    password: string;
  };

  // Selectors for login form elements
  loginSelectors: {
    usernameField: string;
    passwordField: string;
    signInButton: string;
    signOutButton: string;
  };

  // Timeout values for various operations
  timeouts: {
    short: number;    // 3000ms - quick operations
    medium: number;   // 5000ms - standard operations
    long: number;     // 10000ms - slow operations
  };
};
```

## Using Configuration

### In Fixture Files

Both `loginPage.ts` and `pageObjects.ts` import and use the configuration:

```typescript
import { testConfig } from '../config/testConfig';

// Usage in fixture setup
await page.goto(testConfig.baseUrl);
await page.fill(testConfig.loginSelectors.usernameField, testConfig.credentials.username);
```

### Adding Configuration to Tests

If you need to access configuration in tests, import it directly:

```typescript
import { testConfig } from '../config/testConfig';

test('example', async ({ sidebar }) => {
  // Access config values
  const username = testConfig.credentials.username;
  const baseUrl = testConfig.baseUrl;
});
```

## Environment Variables

All configuration values support environment variable overrides:

| Config Value | Environment Variable | Default Value |
|---|---|---|
| `baseUrl` | `PLAYWRIGHT_BASE_URL` | http://frontend-ta-realworldapp.apps.os-prod.lab.proficom.de/ |
| `credentials.username` | `TEST_USERNAME` | Solon_Robel60 |
| `credentials.password` | `TEST_PASSWORD` | s3cret |

### Setting Environment Variables

#### Command Line
```bash
# Windows (PowerShell)
$env:PLAYWRIGHT_BASE_URL="https://myapp.com/"
$env:TEST_USERNAME="testuser"
$env:TEST_PASSWORD="testpass"
npm test

# Unix/Linux/Mac
export PLAYWRIGHT_BASE_URL="https://myapp.com/"
export TEST_USERNAME="testuser"
export TEST_PASSWORD="testpass"
npm test
```

#### .env File
1. Copy `.env.example` to `.env.local`
2. Update values as needed
3. Install dotenv package:
   ```bash
   npm install --save-dev dotenv
   ```
4. Update `playwright.config.ts` to load environment variables:
   ```typescript
   import dotenv from 'dotenv';
   dotenv.config({ path: '.env.local' });
   ```

#### CI/CD Pipelines
Set environment variables in your CI/CD system (GitHub Actions, GitLab CI, etc.):

```yaml
# GitHub Actions example
env:
  PLAYWRIGHT_BASE_URL: ${{ secrets.PLAYWRIGHT_BASE_URL }}
  TEST_USERNAME: ${{ secrets.TEST_USERNAME }}
  TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
```

## Modifying Configuration

### Adding New Configuration Values

1. Update `tests/config/testConfig.ts`:
   ```typescript
   export const testConfig = {
     // ... existing config ...
     newSetting: process.env.NEW_SETTING || 'default-value',
   };
   ```

2. Update `.env.example`:
   ```
   NEW_SETTING=default-value
   ```

3. Update this documentation with the new value

### Adding Environment-Specific Configurations

Create separate config files for different environments:

```
tests/config/
├── testConfig.ts       # Base/shared config
├── testConfig.dev.ts   # Development config
├── testConfig.staging.ts
└── testConfig.prod.ts
```

Then load the appropriate config based on environment:

```typescript
const env = process.env.APP_ENV || 'dev';
const configFile = `testConfig.${env}.ts`;
export { testConfig } from `./${configFile}`;
```

## Best Practices

1. **Never commit credentials** - Keep `.env.local` in `.gitignore`
2. **Use environment variables in CI/CD** - Don't hardcode credentials
3. **Document all configuration values** - Update this file when adding new config
4. **Keep defaults reasonable** - Provide sensible defaults for local development
5. **Separate sensitive and non-sensitive config** - URLs can be in code, passwords should be in env vars
6. **Use typed configuration** - TypeScript provides autocomplete and type safety

## Security Considerations

- **Credentials**: Always use environment variables or secrets management for passwords
- **Base URL**: Can be in code for known environments (dev/test)
- **CI/CD**: Use your platform's secrets management (GitHub Secrets, GitLab CI Variables, etc.)
- **.gitignore**: Ensure `.env.local` and any local config files are in `.gitignore`

## Troubleshooting

### "Cannot find module '../config/testConfig'"
- Verify the file exists at `tests/config/testConfig.ts`
- Check the import path is correct relative to your test file

### "Environment variables not loading"
- Verify environment variables are set before running tests
- Use `console.log(testConfig)` to debug the loaded values
- Check `.env.local` file exists and has correct syntax

### "Credentials failing in CI/CD"
- Verify secrets are set in your CI/CD platform
- Check environment variable names match exactly
- Ensure `process.env.VARIABLE_NAME` is being accessed correctly

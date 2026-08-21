export interface UserCredentials {
  username: string;
  password: string;
}

export const users = {
  standard: {
    username: "standard_user",
    password: "secret_sauce",
  },
  locked: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
} satisfies Record<string, UserCredentials>;

export interface InvalidCredentialsCase extends UserCredentials {
  caseName: string;
  expectedError: string;
}

export const invalidCredentials: InvalidCredentialsCase[] = [
  {
    caseName: "unknown username",
    username: "unknown_user",
    password: "secret_sauce",
    expectedError:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    caseName: "incorrect password",
    username: "standard_user",
    password: "incorrect_password",
    expectedError:
      "Epic sadface: Username and password do not match any user in this service",
  },
];

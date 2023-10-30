type VerificationDetail = {
  is_verified: boolean;
  verified_at?: Date;
};

type Verification = {
  email?: VerificationDetail;
  mobile_number?: VerificationDetail;
};

export type User = {
  _id: string;
  verification?: Verification;
  email?: string;
  mobile_number?: string;
  roles: string[];
};

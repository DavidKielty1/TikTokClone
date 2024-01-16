import React, { useState } from "react";
import { REGISTER_USER } from "../graphql/mutations/Register";
import { RegisterUserMutation } from "../gql/graphql";
import { GraphQLErrorExtensions } from "graphql";
import { useMutation } from "@apollo/client";
import { useUserStore } from "../stores/userStore";
import { useGeneralStore } from "../stores/generalStore";
import Input from "./Input";

function Register() {
  const [registerUser, { data }] =
    useMutation<RegisterUserMutation>(REGISTER_USER);
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoginOpen = useGeneralStore((state) => state.setIsLoginOpen);
  const [errors, setErrors] = useState<GraphQLErrorExtensions>({});

  const [registerData, setRegisterData] = React.useState({
    email: "",
    password: "",
    fullname: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    setErrors({});

    await registerUser({
      variables: {
        email: registerData.email,
        password: registerData.password,
        fullname: registerData.fullname,
        confirmPassword: registerData.confirmPassword,
      },
    }).catch((err) => {
      console.log(err.graphQLErrors);
      setErrors(err.graphQLErrors[0].extensions);
    });

    if (data?.register.user)
      setUser({
        id: data?.register.user.id,
        email: data?.register.user.email,
        fullname: data?.register.user.fullname,
      });
    setIsLoginOpen(false);
  };

  return (
    <>
      <div className="text-center text-[28px] mb-4 font-bold">Sign Up</div>
      <div className="px-6 pb-2">
        <Input
          max={64}
          placeHolder="Full Name"
          inputType="text"
          onChange={(e) =>
            setRegisterData({ ...registerData, fullname: e.target.value })
          }
          autoFocus={true}
          error={errors?.fullname as string}
        />
      </div>
      <div className="px-6 pb-2">
        <Input
          max={64}
          placeHolder="Email"
          inputType="text"
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
          autoFocus={false}
          error={errors?.email as string}
        />
      </div>
      <div className="px-6 pb-2">
        <Input
          max={64}
          placeHolder="Password"
          inputType="password"
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
          autoFocus={false}
          error={errors?.password as string}
        />
      </div>
      <div className="px-6 pb-2">
        <Input
          max={64}
          placeHolder="Confirm Password"
          inputType="Password"
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              confirmPassword: e.target.value,
            })
          }
          autoFocus={false}
          error={errors?.confirmPassword as string}
        />
      </div>
      <div className="px-6 mt-6">
        <button
          onClick={handleRegister}
          disabled={
            !registerData.email ||
            !registerData.password ||
            !registerData.fullname ||
            !registerData.confirmPassword
          }
          className={[
            `w-full text-[17px] font-semibold text-white py-3 rounded-sm`,
            !registerData.email ||
            !registerData.password ||
            !registerData.fullname ||
            !registerData.confirmPassword
              ? "bg-gray-200"
              : "bg-pinkred",
          ].join(" ")}
        >
          Register
        </button>
      </div>
      <div></div>
    </>
  );
}

export default Register;

/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthProvider';
import SquaredButton from '../../components/common/buttons/SquaredButton';
import Hr from '../../components/common/Hr/Hr';
import InputForm from '../../components/common/InputForm/InputForm';

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    lastName: string;
    firstName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    pseudonym: string;
    hasConsented: boolean;
  }>();

  const [errorMessage, setErrorMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { isLoggedIn, login, logout } = useAuth();
  const authToken = Cookies.get('authToken');

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .min(7, 'Le mot de passe doit comporter au moins 7 caractères')
      // on va imposer des restrictions grace à des regex
      .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Le mot de passe doit contenir au moins un caractère spécial'
      )
      .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
      .required('Le mot de passe est requis'),
  });

  const handleRegister = async (data: {
    lastName: string;
    firstName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    pseudonym: string;
    hasConsented: boolean;
  }) => {
    try {
      await passwordSchema.validate(data, { abortEarly: false });
      // La validation a réussi, vous pouvez maintenant envoyer les données au serveur

      const response = await fetch('http://localhost:5174/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(data);
      if (response.ok) {
        // Message de confirmation de création de compte
        setRegisterSuccess(true);
      } else {
        //  Gérer les erreurs d'authentification ici
        setErrorMessage('Erreur lors de la soumission du formulaire'); // Définir le message d'erreur
      }
    } catch (error: any) {
      // Gérer les erreurs de validation ici
      console.error("Erreur lors de l'inscription", error);
      if (error.path === 'password') {
        setPasswordError(error.message);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="relative bg-light-brown flex justify-center items-center flex-1 h-[75vh] max-h-[75vh]">
      <div className="relative w-4/5 lg:w-4/6 p-4 h-4/5 lg:max-h-4/5 flex flex-col overflow-y-auto shadow-light-gray shadow-xl rounded-2xl bg-dark-gray">
        <div className="text-center">
          <h1 className="text-dark-brown pt-5 font-bold text-xl sm:text-2xl">
            Créer son compte membre
          </h1>
        </div>
        <Hr />
        <div className="flex flex-col w-full animate-fade-in-down">
          <div className="px-1 md:px-10">
            <h3 className=" font-semibold text-dark-brown text-lg sm:text-xl">
              Être membre c&apos;est quoi ?
            </h3>
            <br />
            <p className="text-light-brown text-lg">
              Il vous permet de commenter les recettes de cocktails. Vous
              pourrez ainsi suggérer votre touche personnelle aux autres
              utilisateurs et développer votre goût pour la créativité !
            </p>
            <br />
            <p className="text-light-brown text-lg">
              Vous pourrez également noter les cocktails et ainsi éclairer les
              autres utilisateurs sur la qualité de ces dernières. Cela nous
              permettra également de faire le tri et de ne garder que les
              meilleures recettes sur notre site !
            </p>
          </div>
          <Hr />
          <div className="flex flex-row justify-around px-10 pt-2">
            <div className="w-full flex justify-around">
              {!registerSuccess ? (
                <form
                  onSubmit={handleSubmit(handleRegister)}
                  className="flex flex-col items-center sm:items-start"
                >
                  <div className="flex flex-col sm:flex-row justify-center w-full md:justify-between">
                    <div className="sm:m-5 mx-auto">
                      <InputForm
                        type="text"
                        htmlFor="lastName"
                        registerName="lastName"
                        name="Nom"
                        register={register}
                      />

                      <InputForm
                        type="text"
                        htmlFor="firstName"
                        registerName="firstName"
                        name="Prénom"
                        register={register}
                      />
                      <InputForm
                        type="text"
                        htmlFor="pseudonym"
                        registerName="pseudonym"
                        name="Pseudo"
                        register={register}
                      />
                    </div>
                    <div className="sm:m-5 mx-auto ">
                      <label htmlFor="dateOfBirth" className="text-light-brown">
                        Date de naissance
                      </label>
                      <InputForm
                        type="Date"
                        htmlFor="dateOfBirth"
                        registerName="dateOfBirth"
                        register={register}
                      />

                      <InputForm
                        type="email"
                        htmlFor="email-register"
                        registerName="email"
                        name="Adresse Mail"
                        register={register}
                      />
                      <InputForm
                        type="password"
                        htmlFor="password-register"
                        registerName="password"
                        name="Mot de passe"
                        register={register}
                      />
                      <p className="text-xs text-light-gray w-[13em]">
                        Le mot de passe doit contenir au minimum 7 caractères,
                        dont 1 majuscule, 1 chiffre et 1 caracère spécial.
                      </p>
                      {passwordError && (
                        <p className="text-red-600 ">{passwordError}</p>
                      )}
                    </div>
                  </div>

                  <div className="py-4 text-center w-full ">
                    <label
                      htmlFor="consentement"
                      className="p-2 text-light-brown"
                    >
                      Consentez vous aux{' '}
                      <Link
                        to="/mentions-legales"
                        target="blank"
                        className="text-dark-brown "
                      >
                        mentions légales
                      </Link>
                    </label>
                    <input
                      type="checkbox"
                      className="p-2"
                      required
                      {...register('hasConsented')}
                    />
                  </div>
                  {/* Afficher le message d'erreur ici */}
                  {errorMessage && (
                    <div className="w-full text-red-900 text-center">
                      {errorMessage}
                    </div>
                  )}
                  <div className="w-full flex justify-center">
                    <SquaredButton
                      name="Inscription"
                      type="submit"
                      height={2.5}
                      width={8}
                    />
                  </div>
                </form>
              ) : (
                <p className="w-full text-green-600 text-center">
                  Création de compte réussi! Vous pouvez maintenant vous
                  connectez avec vos identifiants!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

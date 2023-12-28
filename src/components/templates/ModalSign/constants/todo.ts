{
    /* <div data-label-input data-password>
                        <label htmlFor="password">
                            Пароль <sup>*</sup>
                        </label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true, minLength: 5 }}
                            render={({ field }) => (
                                <div>
                                    <input {...field} placeholder="Введите свой пароль" type={isPass ? "text" : "password"} />
                                    <Image
                                        onClick={() => setIsPass((prev) => !prev)}
                                        src={isPass ? "/svg/eye.svg" : "/svg/eye-off.svg"}
                                        alt="eye"
                                        width={20}
                                        height={20}
                                        data-eye
                                        unoptimized
                                    />
                                </div>
                            )}
                        />
                        {errors.password ? (
                            <i>
                                {errors.password?.message === "validate_register"
                                    ? "Пароль должен содержать хотя бы одну большую и маленькую букву и цифру."
                                    : errors.password
                                    ? "Требуется пароль"
                                    : ""}
                            </i>
                        ) : null}
                    </div> */
}

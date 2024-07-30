import React, {useEffect} from 'react';
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {authForm, submitFormData, verifyUser} from '../../services/forms-service';
import Modal from './modal';
import Error from "~/components/form/error.tsx";

// Interface for form inputs
interface IFormInput {
    nickname: string;
    birthday: string;
    source: string;
    hobbies: string;
    tasks: string;
    experience: string;
    conflicts: string;
    memory: string;
    launcher: string;
    person: string;
}

const Form: React.FC = () => {
    const {register, handleSubmit} = useForm<IFormInput>();

    useEffect(() => {
        const processAuth = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            if (code) {
                try {
                    const discordId = await authForm(code);
                    if (discordId != null) {
                        window.history.replaceState({}, document.title, '/form');
                    }
                } catch (error) {
                    console.error('Error during authentication:', error);
                }
            } else {
                const storedDiscordId = localStorage.getItem('discord_id');
                if (storedDiscordId) {
                    try {
                        const hasNotTried = await verifyUser(storedDiscordId);
                        if (!hasNotTried) {
                            document.getElementById('errorModal').showModal();
                        }
                    } catch (error) {
                        console.error('Error while retrieving the form:', error);
                    }
                } else {
                    redirectToDiscord();
                }
            }
        };
        processAuth();
    }, []);


    const redirectToDiscord = () => {
        const clientId = "1226236763975188550";
        const redirectUri = "https://uaproject.xyz/form";
        const scope = 'identify';
        window.location.href = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
    };

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const discord_id = localStorage.getItem('discord_id');
        console.log('Auth code:', discord_id);
        if (discord_id == null) {
            console.error('User is not authenticated');
            return false;
        }

        try {
            const response = await submitFormData(data, discord_id);

            if (response) {
                console.log('Form Submitted', data);
                document.getElementById('successModal').showModal();
            } else {
                console.error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <Modal/>
            <Error/>
            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                <div className="form-grid">
                    <div className="form-item">
                        <label>Ігровий нікнейм</label>
                        <input {...register('nickname', {required: true})} />
                    </div>

                    <div className="form-item">
                        <label>Дата народження</label>
                        <input type="date" {...register('birthday', {required: true})} />
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-item">
                        <label>З якого лаунчеру ви граєте?</label>
                        <select {...register('launcher', {required: true})}>
                            <option value="Official Launcher">Minecraft Launcher</option>
                            <option value="Prism Launcher">Prism Launcher</option>
                            <option value="MultiMC">MultiMC Launcher</option>
                            <option value="GDLauncher">GDLauncher</option>
                            <option value="ATLauncher">ATLauncher</option>
                            <option value="Void Launcher">Void Launcher</option>
                            <option value="Technic Launcher">Technic Launcher</option>
                            <option value="CurseForge">CurseForge</option>
                            <option value="SKLauncher">SKLauncher</option>
                            <option value="PollyMc">PollyMc</option>
                            <option value="TLauncher">TLauncher</option>
                            <option value="TLegacy">TLauncher Legacy</option>
                            <option value="Badlion">Badlion</option>

                        </select>
                    </div>

                    <div className="form-item">
                        <label>Хто ви за типом гравця в майнкрафті?</label>
                        <select {...register('person', {required: true})}>
                            <option value="Боєць">Боєць</option>
                            <option value="Пригодник">Пригодник</option>
                            <option value="Інженер">Інженер</option>
                            <option value="Майстер">Майстер</option>
                            <option value="Маг">Маг</option>
                            <option value="Торговець">Торговець</option>
                            <option value="Фермер">Фермер</option>
                            <option value="Шахтар">Шахтар</option>
                            <option value="Художник">Художник</option>
                            <option value="Будівельник">Будівельник</option>
                        </select>
                    </div>

                </div>

                <div className="form-grid">

                    <div className="form-item">
                        <label>Звідки ви дізналися про наш сервер?</label>
                        <input {...register('source', {required: true})} />
                    </div>

                    <div className="form-item">
                        <label>Чим ви займаєтесь у вільний час</label>
                        <input {...register('hobbies', {required: true})} />
                    </div>

                </div>

                <div className="form-grid">

                    <div className="form-item full-width">
                        <label>
                            Для того, щоб викопати яму, трьом чоловікам потрібно 5 годин. Скільки
                            часу потрібно восьми чоловікам? Відповідь обґрунтуйте :)
                        </label>
                        <input {...register('tasks', {required: true})} />
                    </div>

                </div>
                <div className="form-grid">

                    <div className="form-item full-width">
                        <label>
                            У вас є досвід гри на приватних майнкрафт серверах? Опишіть його
                            якомога детальніше!
                        </label>
                        <input {...register('experience', {required: true})} />
                    </div>

                </div>

                <div className="form-grid">

                    <div className="form-item full-width">
                        <label>
                            Уявіть, що вас ображає адміністратор серверу. Що ви зробите, якщо
                            потрапите у таку ситуацію?
                        </label>
                        <input {...register('conflicts', {required: true})} />
                    </div>

                </div>

                <div className="form-grid">

                    <div className="form-item full-width">
                        <label>Опишіть ваш улюблений спогад із дитинства :)</label>
                        <input className={".large-input"}  {...register('memory', {required: true})} />
                    </div>

                </div>

                <button type="submit"> Зберегти і відправити</button>
            </form>
        </>

    );
};

export default Form;

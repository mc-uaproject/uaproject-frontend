import React, {useCallback, useEffect, useState} from 'react';
import {fetchSession} from './session.js';
import FormField from './form-field.jsx';
import Modal from "~/components/form/modal.jsx";
import {getFormData, saveFormData} from "~/services/forms-service.js";
import ErrorModal from "~/components/form/error.jsx";

const Form = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [customLauncher, setCustomLauncher] = useState(false);
    const [errors, setErrors] = useState({});
    let [formData, setFormData] = useState({
        nickname: '',
        birthDate: '',
        advised: '',
        hobbies: '',
        typeOfPlayer: '',
        gameLauncher: '',
        otherLauncher: '',
        task: '',
        experience: '',
        conflict: '',
        memory: '',
    });

    useEffect(() => {
        console.log('Form component mounted');
        const getSession = async () => {
            console.log('Fetching session data...');
            const sessionData = await fetchSession();
            setSession(sessionData);
            console.log('Session data:', sessionData);
            return sessionData;
        };

        getSession().then(async (sessionData) => {
            if (sessionData && sessionData.user) {
                console.log('Fetching form data for user ID:', sessionData.user.id);
                try {
                    const formData = await getFormData(sessionData.user.id);
                    console.log('Form data:', formData);
                    setFormData(formData);

                    // Conditional logic for form data
                    if (formData) {
                        console.log('Form data exists, showing error modal');
                        document.getElementById('error-modal').showModal();
                        document
                            .getElementById('error-modal')
                            .addEventListener('close', () => {
                                window.location.href = '/';
                            });
                    }
                } catch (error) {
                    console.error('Error fetching form data:', error);
                }
            } else {
                console.warn('No user found in session');
            }
            setLoading(false);
        });
    }, []);


    const validateForm = useCallback(() => {
        const newErrors = {};
        const requiredFields = [
            'nickname', 'birthDate', 'advised', 'hobbies', 'typeOfPlayer',
            'gameLauncher', 'task', 'experience', 'conflict', 'memory'
        ];
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = '^';
            }
        });
        if (customLauncher && !formData.otherLauncher) {
            newErrors.otherLauncher = '^';
        }
        return newErrors;
    }, [formData, customLauncher]);

    const handleSubmit = async () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.error('Form validation failed:', newErrors);
            return;
        }

        try {
            const updatedPerson = {
                ...formData,
                gameLauncher: customLauncher ? 'OTHER' : formData.gameLauncher,
                otherLauncher: customLauncher ? formData.otherLauncher : '',
            };

            if (session && session.user && session.user.id) {
                await saveFormData(session.user.id, updatedPerson);
            }

            console.log('Form submitted successfully!');
            document.getElementById("success-modal").showModal();
            document.getElementById("success-modal").addEventListener('close', () => {
                window.location.href = '/';
            });
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        if (name === 'gameLauncher' && value === 'OTHER') {
            setCustomLauncher(true);
        } else if (name === 'gameLauncher') {
            setCustomLauncher(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-wheel">
                <span className="loading-spinner text-primary"></span>
            </div>);
    }

    if (session && session.user && session.user.id) {
        const formFields = [
            [
                {label: 'Ваш нікнейм', name: 'nickname', inline: true},
                {label: 'Дата народження', name: 'birthDate', type: 'date', inline: true}
            ],
            [
                {label: 'Звідки ви дізналися про наш сервер?', name: 'advised'},
                {label: 'Чим ви займаєтесь у вільний час?', name: 'hobbies'},
            ],
            [
                {
                    label: 'Хто ви за типом гравця в майнкрафті?', name: 'typeOfPlayer', type: 'select',
                    options: [
                        {value: 'ADVENTURER', label: 'Пригодник'},
                        {value: 'BUILDER', label: 'Будівельник'},
                        {value: 'FARMER', label: 'Фермер'},
                        {value: 'FIGHTER', label: 'Боєць'},
                        {value: 'REDSTONE_ENGINEER', label: 'Інженер'}
                    ]
                },
                {
                    label: 'З якого лаунчеру ви граєте?', name: 'gameLauncher', type: 'select',
                    options: [
                        {value: 'MINECRAFT_LAUNCHER', label: 'Minecraft Launcher'},
                        {value: 'POLYMC', label: 'PolyMC Launcher'},
                        {value: 'TLAUNCHER', label: 'TLauncher'},
                        {value: 'TLAUNCHER_LEGACY', label: 'TLauncher Legacy'},
                        {value: 'BEDROCK', label: 'Bedrock'},
                        {value: 'PRISM', label: 'Prism Launcher'},
                        {value: 'ATLAUNCHER', label: 'ATLauncher'},
                        {value: 'SKLAUNCHER', label: 'SKLauncher'},
                        {value: 'POLLYMC', label: 'PollyMc Launcher'},
                        {value: 'GDLAUNCHER', label: 'GDLauncher'},
                        {value: 'OTHER', label: 'Інший'}
                    ]
                },
            ],
            {
                label: 'Вкажіть назву іншого лаунчера (якщо обрали інший)',
                name: 'otherLauncher',
                type: 'text',
                showIf: customLauncher
            },
            {
                label: 'Для того, щоб викопати яму, трьом чоловікам потрібно 5 годин. Скільки часу потрібно восьми чоловікам? Відповідь обґрунтуйте :)',
                name: 'task',
                type: 'textarea'
            },
            {
                label: 'У вас є досвід гри на приватних майнкрафт серверах? Опишіть його якомога детальніше!',
                name: 'experience',
                type: 'textarea'
            },
            {
                label: 'Уявіть, що вас ображає адміністратор серверу. Що ви зробите, якщо потрапите у таку ситуацію?',
                name: 'conflict',
                type: 'textarea'
            },
            {
                label: 'Опишіть ваш улюблений спогад із дитинства :)', name: 'memory', type: 'textarea'
            }
        ];

        return (
            <div className="form-container">
                <div className="form-container">
                    <form onSubmit={(e) => e.preventDefault()}>
                        {formFields.map((fieldGroup, index) => (
                            Array.isArray(fieldGroup) ? (
                                <div key={index} className="form-group-inline">
                                    {fieldGroup.map(field => (
                                        <FormField
                                            key={field.name}
                                            label={field.label}
                                            name={field.name}
                                            type={field.type}
                                            value={formData[field.name]}
                                            onChange={handleInputChange}
                                            error={errors[field.name]}
                                            options={field.options}
                                            hidden={field.hidden}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <FormField
                                    key={fieldGroup.name}
                                    label={fieldGroup.label}
                                    name={fieldGroup.name}
                                    type={fieldGroup.type}
                                    value={formData[fieldGroup.name]}
                                    onChange={handleInputChange}
                                    error={errors[fieldGroup.name]}
                                    options={fieldGroup.options}
                                    hidden={fieldGroup.hidden}
                                />
                            )
                        ))}
                        <div className="form-group">
                            <button type="button" onClick={handleSubmit}>
                                Зберегти і відправити
                            </button>
                        </div>
                        <Modal/>
                        <ErrorModal/>
                    </form>
                </div>
            </div>
        );
    } else {
        window.location.href = '/auth/login';
    }
};

export default Form;

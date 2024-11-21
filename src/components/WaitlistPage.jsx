import React, { useState } from 'react';
import './css/Waitlist.css';
import { Mail, CheckCircle, CircleCheck } from 'lucide-react';
import { db } from '../Firebase';
import { Timestamp, collection, addDoc } from 'firebase/firestore';

async function addDataToFireStore(email) {
    try {
        const docRef = await addDoc(collection(db, "subscribers"), {
            email: email,
            time: Timestamp.now(),
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (error) {
        console.log("Error adding Document", error);
        return false;
    }
}

function WaitlistPage() {
    const [email, setEmail] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const added = await addDataToFireStore(email);
        if (added) {
            setEmail('');
            setModalVisible(true); // Show the modal
        }
    };

    const closeModal = () => {
        setModalVisible(false); // Hide the modal
    };

    return (
        <div className='waitlist-parent'>
            <div className='title'>
                <h1>Coming Soon: EquityWise.AI</h1>
            </div>
            <div>
                <p className='check-title'>Stock Options Made Simple</p>
                <p className='check-para'><CheckCircle className='check-cirle' /> Track Your Stock Option Value</p>
                <p className='check-para'><CheckCircle className='check-cirle' /> Optimize Your Tax Strategy</p>
                <p className='check-para'><CheckCircle className='check-cirle' /> Unlock Liquidity Opportunities</p>
            </div>
            <div>
                <form
                    method="POST"
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '1rem',
                    }}
                >
                    <div style={{ position: 'relative', width: '320px', marginBottom: '1rem' }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            autoComplete='off'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                color: 'white',
                                width: '100%',
                                padding: '10px 40px 10px 10px',
                                borderRadius: '8px',
                                border: 'none',
                                outline: 'none',
                                transform: 'translateX(-5%)',
                                fontSize: '14px',
                                background: 'linear-gradient(45deg, black 40%, gray 100%)',
                            }}
                        />
                        <Mail
                            style={{
                                position: 'absolute',
                                right: '-20px',
                                top: '50%',
                                transform: 'translateY(-40%)',
                                color: '#fff',
                            }}
                        />
                    </div>
                    <button type="submit" className='submit-btn'>
                        Join the Waitlist
                    </button>
                </form>
                <p className='unsubscribe-para'>No spam. <a className='unsubscribe-btn' href="/unsubscribe">Unsubscribe</a> anytime.</p>
            </div>

            {/* Modal */}
            {isModalVisible && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <CircleCheck className='cirle-check'/>
                        <h2>Success!</h2>
                        <p style={{ fontStyle: "italic" , fontSize:"15px"}}>Thank You for joining us, we have added you to our waitlist!</p>
                        <button onClick={closeModal} className='close-modal-btn'>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WaitlistPage;

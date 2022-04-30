import React from 'react';
import './inclusioncss.css'

const Inclusion = (props) => {
    return (
        <div className='center'>
            <div className='headerinclusion'>
                <p>Inclusion/Exclusion</p>
            </div>
            <div className='indicatorHeader'>
                <p>Inclusion</p>
                <p>Exclusion</p>

            </div>
            <div className='inclusionContaint1'>
                <div className='setaline'>

                    <p className='tag_heading'>Meal plan</p>
                    <div className='breakfast'>
                        Breakfast
                        <div className='settingToSide'>
                            <input name='Breakfast' type='radio' />
                            <input name='Breakfast' type='radio' />
                        </div>

                    </div>
                    <div >
                        <div className='breakfast'>
                            Lunch
                            <div className='settingToSide'>
                                <input name='Lunch' type='radio' />
                                <input name='Lunch' type='radio' />
                            </div>
                        </div>
                        <textarea className='comments_from' placeholder='Please write comments'></textarea>
                    </div>
                    <div >
                        <div className='breakfast'>
                            Dinner
                            <div className='settingToSide'>
                                <input name='Dinner' type='radio' />
                                <input name='Dinner' type='radio' />
                            </div>
                        </div>
                        <textarea className='comments_from' placeholder='Please write comments'></textarea>
                    </div>
                </div>
            </div>
            <div className='inclusionContaint1'>
                <div className='setaline'>
                    <p className='tag_heading'>airport transfer</p>
                    <div className='breakfast'>
                        Arival
                        <div className='settingToSide'>
                            <input name='Arival' type='radio' />
                            <input name='Arival' type='radio' />
                        </div>
                    </div>
                    <div className='breakfast'>
                        Departure
                        <div className='settingToSide'>
                            <input name='Departure' type='radio' />
                            <input name='Departure' type='radio' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='inclusionContaint1'>
                <div className='setaline'>
                    <p className='tag_heading'>Cab Type</p>
                    <div className='breakfast'>
                        SIC
                        <div className='settingToSide'>
                            <input name='SIC' type='radio' />
                            <input name='SIC' type='radio' />
                        </div>
                    </div>
                    <div className='breakfast'>
                        Private
                        <div className='settingToSide'>
                            <input name='Private' type='radio' />
                            <input name='Private' type='radio' />
                        </div>
                    </div>
                    <textarea className='comments_from' placeholder='Please write comments'></textarea>
                </div>


            </div>
            <div className='inclusionContaint1'>
                <div className='setaline'>
                    <div className='breakfast'>
                        airfair
                        <div className='settingToSide'>
                            <input name='airfair' type='radio' />
                            <input name='airfair' type='radio' />
                        </div>
                    </div>
                    <div className='breakfast'>
                        GST
                        <div className='settingToSide'>
                            <input name='GST' type='radio' />
                            <input name='GST' type='radio' />
                        </div>
                    </div>
                    <div className='breakfast'>
                        siteseeing
                        <div className='settingToSide'>
                            <input name='siteseeing' type='radio' />
                            <input name='siteseeing' type='radio' />
                        </div>
                    </div>
                    <textarea className='comments_from' placeholder='Please write comments'></textarea>
                    <div className='breakfast'>
                        Visa + OTB
                        <div className='settingToSide'>
                            <input name='Visa' type='radio' />
                            <input name='Visa' type='radio' />
                        </div>
                    </div>
                    <textarea className='comments_from' placeholder='Please write comments'></textarea>
                    <div className='breakfast'>
                        Entrance Fee/Extra activity
                        <div className='settingToSide'>
                            <input name='Entrance' type='radio' />
                            <input name='Entrance' type='radio' />
                        </div>
                    </div>
                    <textarea className='comments_from' placeholder='Please write comments'></textarea>
                </div>


            </div>
            <div className='inclusionContaint1'>
                <div className='setaline'>
                    <p className='tag_heading'>others</p>
                    <div className='breakfast'>
                        other Inclusion
                    </div>
                    <textarea className='other_inclusion' placeholder='Please write comments'></textarea>
                    <div className='breakfast'>
                        other Exclusion
                    </div>
                    <textarea className='other_exclusion' placeholder='Please write comments'></textarea>
                </div>
            </div>
            <div className='cancel_button_div'>
                <button className='cancel_button' onClick={()=>props.onClose()}>cancel</button>
                <button className='cancel_button' onClick={()=>props.onClose()}>save</button>
            </div>
        </div>
    );
}

export default Inclusion;

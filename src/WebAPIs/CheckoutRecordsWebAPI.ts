import axios from 'axios';

export default class CheckoutRecordsWebAPI
{
    public constructor(){
        axios.defaults.withCredentials=true;
    }
    private readonly _url='/api/CheckoutRecords';
    public async FixtureRoomApproveAsync(fixtureNo:number)
    {
        await axios.post(`${this._url}/FixtureRoomApprove/${fixtureNo}`,{params:{date:new Date()}});
    }
}
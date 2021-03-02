import axios from 'axios';

export default class CheckinRecordsWebAPI
{
    private readonly _url='/api/CheckinRecords';
    public constructor(){
        axios.defaults.withCredentials=true;
    }
    public async FixtureRoomApproveAsync(fixtureNo:number)
    {
        await axios.post(`${this._url}/FixtureRoomApprove/${fixtureNo}`,{params:{date:new Date()}});
    }
}
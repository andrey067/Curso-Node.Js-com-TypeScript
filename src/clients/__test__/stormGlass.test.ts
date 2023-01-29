import { StormGlass } from '@src/clients/stormGalss';
import axios from 'axios';
import stormGalss_weather_3 from '@test/fixtures/stormGlass_weather_3.json';
import stormGalss_weather_3_normalized_response_3_hours from '@test/fixtures/stormglass_normalized_response_3_hours.json';

jest.mock('axios');

describe('StormGalass client', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    it('should return the normalized forecast from the StormGlass service', async () => {
        const lat = -33.792726;
        const lng = 151.289824;
        mockedAxios.get.mockResolvedValue({ data: stormGalss_weather_3 });
        const stormGalss = new StormGlass(mockedAxios);
        const response = await stormGalss.fetchPoints(lat, lng);
        expect(response).toEqual(stormGalss_weather_3_normalized_response_3_hours);
    })
})
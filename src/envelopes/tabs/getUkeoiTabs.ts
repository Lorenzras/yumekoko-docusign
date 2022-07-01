import docusign, {Tabs, TabsBlob} from 'docusign-esign';

export const getUkeoiTabs = (args: {
  projId: string
  projName: string,
  custName: string,
  custAddress: string,
}) => {
  const {
    projId,
    projName,
    custName,
    custAddress,
  } = args;

  const prefillTabs = {
    tabs: {
      prefillTabs: {
        textTabs: [
          {
            'anchorString': '/koujimei/',
            'anchorUnits': 'pixels',
            'anchorXOffset': '20',
            'anchorYOffset': '10',
            'scaleValue': '1.5',
            'name': 'projName',
            'value': projName,
          },
        ],
      },
    },
  };
  return JSON.stringify(prefillTabs);
};

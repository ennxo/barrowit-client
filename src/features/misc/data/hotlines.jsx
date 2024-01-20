import { BellAlertIcon, FireIcon, PhoneIcon } from '@heroicons/react/24/outline'

export const hotlines = [
    {
      name: 'Barangay 171 Contact',
      description:
        '0951 329 4151',
      icon: PhoneIcon,
    },
    {
      name: 'Alert and Monitoring Operation',
      description:
        '(02)888-25664',
      icon: BellAlertIcon,
    },
    {
      name: 'Fire Rescue Operation',
      description:
      <>
      <li>BFP Caloocan: 5310-6527</li>
      <li>CDRRMO: 5310-6972 {" "}
                  0916 797 6365
      </li>
      <li>North Rescue: 0961 613 2027</li>
      <li>PSTMD: 0961 613 2027</li>
      </>,
      icon: FireIcon,
    },
  ]
const firstSetOfLinks: {
  name: String
  icon_name: String
  to?: String | undefined
}[] = [
  {
    name: 'Dashboard',
    icon_name: 'mdi-view-dashboard',
    to: '/dashboard',
  },
  {
    name: 'Profile',
    icon_name: 'mdi-account',
  },
  {
    name: 'Services',
    icon_name: 'mdi-toolbox-outline',
  },
  {
    name: 'Medical Records',
    icon_name: 'mdi-notebook',
  },
  {
    name: 'Care Wallet',
    icon_name: 'mdi-wallet',
  },
  {
    name: 'Messages',
    icon_name: 'mdi-chat',
  },
  {
    name: 'Resources',
    icon_name: 'mdi-semantic-web',
  },
]

export default firstSetOfLinks

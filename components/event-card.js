import { Card, Box, Heading, Text, Flex, Image } from '@theme-ui/components'
import Tilt from './tilt'
import {
  imageSrc,
  humanizedDateRange,
  humanizeDistance,
  formatAddress,
  trackClick
} from '../lib/util'

const EventCard = ({
  id,
  website,
  name,
  start,
  end,
  parsed_city,
  parsed_state_code,
  parsed_country,
  parsed_country_code,
  banner,
  logo,
  distanceTo,
  startYear,
  mlh,
  invisible,
  inGroup
}) => (
  <Tilt>
    <Card
      as="a"
      href={`https://api.hackclub.com/v1/events/${id}/redirect`}
      target="_blank"
      onClick={trackClick({
        href: website,
        analyticsEventName: 'Event Clicked',
        analyticsProperties: {
          eventUrl: website,
          eventName: name,
          eventId: id
        }
      })}
      itemScope
      itemType="http://schema.org/Event"
      sx={{
        display: invisible ? 'none' : 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        color: 'white',
        textAlign: 'center',
        textShadow: '0 1px 4px rgba(0, 0, 0, 0.375)',
        textDecoration: 'none',
        backgroundColor: 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        p: [3],
        height: '100%'
      }}
      style={{
        backgroundImage:
          banner &&
          `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.375) 75%),
            url(${imageSrc(banner)})`
      }}
    >
      {logo && (
        <Image
          src={imageSrc(logo)}
          alt={`${name} logo`}
          loading="lazy"
          sx={{
            minWidth: 64,
            height: 64,
            objectFit: 'contain',
            borderRadius: 'default',
            mb: 1
          }}
        />
      )}
      <Heading as="h2" itemProp="name" sx={{ mt: 2, mb: 3 }}>
        {inGroup ? name.replace('LHD ', '') : name}
      </Heading>
      <Flex
        sx={{
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <Text as="span">{humanizedDateRange(start, end)}</Text>
        {distanceTo ? (
          <Text as="span">{`${humanizeDistance(distanceTo)} miles`}</Text>
        ) : (
          <Text
            as="span"
            itemProp="location"
            itemScope
            itemType="http://schema.org/Place"
          >
            <span itemProp="address">
              {formatAddress(
                parsed_city,
                parsed_state_code,
                parsed_country,
                parsed_country_code
              )}
            </span>
          </Text>
        )}
      </Flex>
      <Box sx={{ display: 'none' }}>
        <span itemProp="url">{website}</span>
        <span itemProp="startDate" content={start} children={end} />
        <span itemProp="endDate" content={end} children={end} />
      </Box>
    </Card>
  </Tilt>
)

export default EventCard

import { serverTimestamp, where } from '@react-native-firebase/firestore'
import { ArrowDown2, ArrowUp2, Calendar, Call, GlobalSearch, Map, Map1, Message2, TickCircle, User } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { BtnShadowLinearComponent, CheckedButtonComponent, Container, InputComponent, ProgressShippingComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { addDocData } from '../../constants/addDocData'
import { colors } from '../../constants/colors'
import { flags } from '../../constants/flags'
import { fontFamillies } from '../../constants/fontFamilies'
import { getDocsData } from '../../constants/getDocsData'
import { setDocData } from '../../constants/setDocData'
import { sizes } from '../../constants/sizes'
import { AddressModel } from '../../models/AddressModel'
import useAddressStore from '../../zustand/store/useAddressStore'
import useShippingSettingStore from '../../zustand/store/useShippingSetting'
import useUserStore from '../../zustand/store/useUserStore'
const data = [
  {
    icon: <User color={colors.text} size={26} />,
    placholder: 'Name',
    title: 'name'
  },
  {
    icon: <Message2 color={colors.text} size={26} />,
    placholder: 'Email address',
    title: 'email'
  },
  {
    icon: <Call color={colors.text} size={26} />,
    placholder: 'Phone number',
    title: 'phone'
  },
  {
    icon: <Map color={colors.text} size={26} />,
    placholder: 'Address',
    title: 'address'
  },
  {
    icon: <Calendar color={colors.text} size={26} />,
    placholder: 'Zip code',
    title: 'zipCode'
  },
  {
    icon: <Map1 color={colors.text} size={26} />,
    placholder: 'City',
    title: 'city'
  },
  {
    icon: <GlobalSearch color={colors.text} size={26} />,
    placholder: 'Country',
    title: 'country'
  },
]
const data1 = [
  {
    title: '1',
    status: 'success',
    description: 'DELIVERY'
  },
  {
    title: '2',
    status: 'pending',
    description: 'ADDRESS'
  },
  {
    title: '3',
    status: 'waiting',
    description: 'PAYMENT'
  },
]
const ShippingAddressScreen = ({ navigation }: any) => {
  const [form, setForm] = useState<any>({
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: 'Viet Nam'
  });
  const [textError, setTextError] = useState('');
  const [showCountries, setShowCountries] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedType, setSelectedType] = useState('Add new address');
  const { user } = useUserStore()
  const { addresses, setAddresses, editAddress, addAddress } = useAddressStore()
  const [address, setAddress] = useState<AddressModel>();
  const { shippingSetting, setShippingSetting } = useShippingSettingStore()

  useEffect(() => {
    if (user) {
      getDocsData({
        nameCollect: 'addresses',
        condition: [where('userId', '==', user.id)],
        setData: setAddresses
      })
    }
  }, [user])

  useEffect(() => {
    if (addresses) {
      const index = addresses.findIndex((address) => address.default)
      setAddress(addresses[index])
    }
  }, [addresses])

  useEffect(() => {
    if (textError) {
      setTimeout(() => {
        setTextError('');
      }, 3000);
    }
  }, [textError]);

  const handleShippingAddress = () => {
    if (selectedType === 'Add new address') {
      if (
        !form.name ||
        !form.address ||
        !form.phone ||
        !form.email ||
        !form.zipCode ||
        !form.city ||
        !form.country
      ) {
        setTextError('Vui lòng không bỏ trống các thông tin !');
      } else {
        let isDefault: boolean = false;
        if (address && saved) {
          editAddress(
            address.id,
            { ...address, default: false }
          )
          setDocData({
            nameCollect: 'addresses',
            id: address.id,
            valueUpdate: {
              default: false,
              updateAt: serverTimestamp()
            },
          });
          isDefault = true;
        }

        addDocData({
          nameCollect: 'addresses',
          value: {
            ...form,
            userId: user?.id,
            default: isDefault,
          },
        }).then(result => {
          addAddress({
            ...form,
            userId: user?.id,
            default: isDefault,
            id: result.id
          })
          setShippingSetting({
            ...shippingSetting,
            address: {
              ...form,
              userId: user?.id,
              default: isDefault,
              id: result.id
            }
          })
        });
        navigation.navigate('PaymentMethodScreen')
      }
    } else {
      navigation.navigate('PaymentMethodScreen')
    }
  };

  return (
    <Container back bg={colors.background} title='Shipping Address'>
      <View style={{
        backgroundColor: colors.background1,
        flex: 1,
        paddingTop: 20
      }}>
        <SectionComponent styles={{
          flex: 1
        }}>
          <View style={{
            paddingHorizontal: 30,
            paddingVertical: 10
          }}>
            <RowComponent justify='space-around'>
              {
                data1.map((_, index) =>
                  <ProgressShippingComponent key={index}
                    index={index}
                    status={_.status}
                    title={_.title}
                    description={_.description}
                  />
                )
              }

            </RowComponent>
          </View>

          <RowComponent justify='space-around' styles={{
            marginVertical: 16
          }}>
            <TouchableOpacity
              onPress={() => setSelectedType('Add new address')}>
              <TextComponent text='Add new address'
                font={selectedType === 'Add new address' ? fontFamillies.poppinsBold : fontFamillies.poppinsRegular}
                color={selectedType === 'Add new address' ? colors.primary : colors.text}
              />
            </TouchableOpacity>
            <View style={{
              width: 2,
              backgroundColor: colors.background,
              height: '100%'
            }} />
            <TouchableOpacity
              onPress={() => setSelectedType('Use address default')}>
              <TextComponent text='Use address default'
                font={selectedType === 'Use address default' ? fontFamillies.poppinsBold : fontFamillies.poppinsRegular}
                color={selectedType === 'Use address default' ? colors.primary : colors.text}
              />
            </TouchableOpacity>
          </RowComponent>
          {
            selectedType === 'Add new address' &&
            <ScrollView showsVerticalScrollIndicator={false}>
              {
                data.map((_, index) =>
                  <InputComponent
                    key={index}
                    styles={{
                      backgroundColor: colors.background,
                      paddingVertical: 12,
                      paddingHorizontal: 26,
                      borderRadius: 5,
                      marginBottom: 6
                    }}
                    allowClear={_.title !== 'country'}
                    prefix={_.icon}
                    placeholder={_.placholder}
                    placeholderTextColor={colors.text}
                    color={colors.background}
                    value={form[_.title]}
                    editable={_.title !== 'country'}
                    onChange={val => setForm({
                      ...form, [_.title]: val
                    })}
                    affix={
                      _.title === 'country' && (
                        <>
                          {showCountries ? (
                            <ArrowUp2
                              size={20}
                              color={colors.text}
                              variant="Bold"
                              onPress={() => setShowCountries(!showCountries)}
                            />
                          ) : (
                            <ArrowDown2
                              size={20}
                              color={colors.text}
                              variant="Bold"
                              onPress={() => setShowCountries(!showCountries)}
                            />
                          )}
                        </>
                      )
                    }
                  />
                )
              }
              {showCountries && (
                <SectionComponent
                  styles={{
                    backgroundColor: colors.background,
                  }}
                >
                  {flags.map((_, index) => (
                    <RowComponent
                      key={index}
                      onPress={() => {
                        setShowCountries(false)
                        setForm({ ...form, country: _.title });
                      }}
                      styles={{
                        borderTopWidth: 1,
                        borderTopColor: colors.border,
                        paddingVertical: 10,
                      }}
                    >
                      <Image
                        source={{
                          uri: _.icon,
                        }}
                        style={{
                          resizeMode: 'cover',
                          height: 30,
                          width: 30,
                        }}
                      />
                      <SpaceComponent width={10} />
                      <TextComponent text={_.title} />
                    </RowComponent>
                  ))}
                </SectionComponent>
              )}
              <SpaceComponent height={10} />
              <SectionComponent>
                <CheckedButtonComponent
                  value={saved}
                  title='Save this address'
                  onPress={(val: boolean) => setSaved(val)}
                />
              </SectionComponent>
              {textError && (
                <View>
                  <SpaceComponent height={8} />
                  <TextComponent
                    text={textError}
                    color={colors.red}
                    font={fontFamillies.poppinsLight}
                    styles={{
                      fontStyle: 'italic',
                    }}
                  />
                </View>
              )}
            </ScrollView>
          }

          {
            selectedType === 'Use address default' && address &&
            <>
              <RowComponent justify='flex-start'
                styles={{
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border
                }}
              >
                <TickCircle color={colors.primary} size={24} variant='Bold' />
                <RowComponent
                  styles={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    flex: 1, marginHorizontal: 16
                  }}
                >
                  <TextComponent
                    text={address.name}
                    font={fontFamillies.poppinsSemiBold}
                    size={sizes.bigText}
                  />
                  <TextComponent
                    text={`${address.address}, ${address.city}, ${address.country} ${address.zipCode}`}
                    size={sizes.smallText}
                    styles={{
                      width: '70%',
                    }}
                  />
                  <TextComponent
                    text={address.phone}
                    size={sizes.smallText}
                    font={fontFamillies.poppinsSemiBold}
                  />
                </RowComponent>
              </RowComponent>

              <TouchableOpacity
                style={{
                  paddingVertical: 16
                }}
                onPress={() => navigation.navigate('AddressScreen')}
              >
                <TextComponent
                  styles={{
                    textAlign: 'center',
                  }}
                  text='Change address default'
                  font={fontFamillies.poppinsSemiBold}
                  color={colors.text2}
                />
              </TouchableOpacity>

            </>
          }
        </SectionComponent>

        <SectionComponent>
          <BtnShadowLinearComponent
            onPress={handleShippingAddress}
            title='Next'
          />
        </SectionComponent>
      </View>
    </Container>
  )
}

export default ShippingAddressScreen
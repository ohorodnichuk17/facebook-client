import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Divider, Menu, Row, Col, Typography, Upload, Dropdown, Input, Switch, GetProp, Modal, Form, Select } from 'antd';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { CameraOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import './UserProfilePage.css';
import { useAppSelector } from '../../../hooks/redux';
import { IUploadedFile, IUserProfile, IUserProfileEditModel } from './types';
import axios from 'axios';
import { APP_ENV } from '../../../env';

import cameraPng from '../../../assets/profile/camera.png';
import avatarPng from '../../../assets/authentication/avatar.png';
import editPng from '../../../assets/profile/edit.png';
import imagePng from '../../../assets/profile/edit.png';

const { TextArea } = Input;

const formConfig = {
  aboutMe: {
    label: "About Me",
    type: "textarea",
    placeholder: "Tell about yourself...",
  },
  fields: [
    {
      label: "Country",
      type: "select",
      defaultValue: "do not specify",
      options: [
        "do not specify",
        "USA",
        "Canada",
        // Add more options as needed
      ],
    },
    {
      label: "Region",
      type: "select",
      defaultValue: "do not specify",
      options: [
        "do not specify",
        // Add region options
      ],
    },
    {
      label: "City",
      type: "select",
      defaultValue: "do not specify",
      options: [
        "do not specify",
        // Add city options
      ],
    },
    {
      label: "Pronouns",
      type: "select",
      defaultValue: "do not specify",
      options: [
        "do not specify",
        "he/him",
        "she/her",
        "they/them",
        // Add more options as needed
      ],
    },
  ],
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const CoverButton = styled(Button)`
  background-color: white;
  border-radius: 10px;
  padding: 2px;
  text-transform: none;
  color: #000000;
  &:hover {
    background-color: #ff7f50;
    box-shadow: none;
  }
  margin: 20px;
`;

const EditButton = styled(Button)`
  background-color: #ff7f50;
  border-radius: 10px;
  padding: 2px;
  width: 15%;
  text-transform: none;
  margin: 7%;
  font-weight: bold;
  color: #000000;
  &:hover {
    background-color: #d9d9d9;
    box-shadow: none;
  }
  @media (max-width: 768px) {
    width: 40%;
    font-size: 12px;
  }
`;

const AvatarButton = styled(Button)`
  background-color: #d9d9d9;
  padding: 0px;
  text-transform: none;
  margin-left: -3vh;
  margin-top: 10vh;
  &:hover {
    background-color: #ff7f50;
    box-shadow: none;
  }
`;

const UserProfilePage: React.FC = () => {
  const [coverPhoto, setCoverPhoto] = useState(imagePng);
  const [avatar, setAvatar] = useState(avatarPng);
  const [avatarAsFile, setAvatarAsFile] = useState<IUploadedFile>();
  const [coverPhotoAsFile, setCoverPhotoAsFile] = useState<IUploadedFile>();
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const { isLogin, user } = useAppSelector(state => state.account);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setAvatar(APP_ENV.BASE_URL + user?.avatar);
    if (user?.id) {
    axios.get(`http://localhost:5181/api/UserProfile/get-profile-by-id/${user.id}`)
      .then(response => {
        setUserProfile(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
    }
    if (user?.avatar == "/images/avatars/") {
      setAvatar(avatarPng);
    }
  }, [user?.id]);

  useEffect(() => {
    if(userProfile?.coverPhoto !== "") {
      setCoverPhoto(APP_ENV.BASE_URL + "/images/coverPhotos/" + userProfile?.coverPhoto);
    }
    else {
      setCoverPhoto(imagePng);
    }
  }, [userProfile?.coverPhoto])

  const handleCoverPhotoChange = async (info: any) => {
    const file = info.fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setCoverPhoto(file.url || (file.preview as string));
    setCoverPhotoAsFile(info.fileList[0] as IUploadedFile);
  };

  const handleAvatarChange = async (info: any) => {
    const file = info.fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setAvatar(file.url || (file.preview as string));
    setAvatarAsFile(info.fileList[0] as IUploadedFile);
  };

  const coverPhotoMenu = (
    <Menu>
      <Upload
        showUploadList={false}
        beforeUpload={() => false}
        accept="image/*"
        onChange={handleCoverPhotoChange}
        maxCount={1}
        defaultFileList={[]}
      >
        <Menu.Item key="1" icon={<CameraOutlined />}>
          <span>Add new cover photo</span>
        </Menu.Item>
      </Upload>
      <Menu.Item key="2" icon={<DeleteOutlined />} onClick={() => setCoverPhoto(APP_ENV.BASE_URL + "/images/coverPhotos/" + userProfile?.coverPhoto)}>
        Delete cover photo
      </Menu.Item>
    </Menu>
  );

  const avatarMenu = (
    <Menu>
      <Upload
        showUploadList={false}
        beforeUpload={() => false}
        accept="image/*"
        onChange={handleAvatarChange}
        maxCount={1}
        defaultFileList={[]}
      >
        <Menu.Item key="1" icon={<CameraOutlined />}>
          <span>Add new avatar</span>
        </Menu.Item>
      </Upload>
      <Menu.Item key="2" icon={<DeleteOutlined />} onClick={() => 
        {if (user?.avatar == "/images/avatars/") {
          setAvatar(avatarPng);
        }
        else {
          setAvatar(APP_ENV.BASE_URL + user?.avatar)}}}
        >
        Delete avatar
      </Menu.Item>
    </Menu>
  );

  const onFinish = (values: IUserProfileEditModel) => {
    const formData = new FormData();

    Object.keys(values).forEach(key => {
      if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
        formData.append(key, values[key]);
      }
    });

    // Append userId
    if (user?.id) {
      formData.append('userId', user.id);
    }

    // Log formData keys and values
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    formData.append("avatar", avatarAsFile?.originFileObj);
    formData.append("coverPhoto", coverPhotoAsFile?.originFileObj);

    axios.put(`http://localhost:5181/api/UserProfile/edit-profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res);
      setIsModalVisible(false);
    }).catch(error => {
      console.log(error);
      alert('Failed to update profile: ' + error.response?.data?.message || error.message);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      {isLogin ? (
        <div style={{ backgroundColor: '#EDE0F5', padding: 0, minHeight: '100vh' }}>
          <Row justify="center" align="middle">
            <Card style={{ width: '100%', maxWidth: '1200px', background: 'transparent', border: "none", boxShadow: 'none' }}>
              <Form
                name="userProfile"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                requiredMark={false}
              >
                <Form.Item
                  name="coverPhoto"
                  valuePropName="file"
                  getValueFromEvent={(e: UploadChangeParam) => {
                    const image = e?.fileList[0] as IUploadedFile;
                    return image?.originFileObj;
                  }}
                >
                  <div
                    className='box'
                    style={{
                      backgroundColor: '#D9D9D9',
                      height: '40vh',
                      borderRadius: '10px',
                      backgroundImage: `url(${coverPhoto})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}
                  >
                    {coverPhoto === imagePng ? (
                      <Upload
                        showUploadList={false}
                        beforeUpload={() => false}
                        accept="image/*"
                        onChange={handleCoverPhotoChange}
                        maxCount={1}
                        defaultFileList={[]}
                      >
                        <CoverButton style={{ display: "flex", alignItems: "center", border: "none", right: "0px", bottom: "0px", position: "absolute" }}>
                          <img src={cameraPng} alt="coverPhoto" style={{ width: 26, height: 22, margin: 5 }} />
                          Add cover photo
                        </CoverButton>
                      </Upload>
                    ) : (
                      <Dropdown overlay={coverPhotoMenu} trigger={['click']}>
                        <CoverButton style={{ display: "flex", alignItems: "center", border: "none", right: "0px", bottom: "0px", position: "absolute" }}>
                          <img src={editPng} alt="editCoverPhoto" style={{ width: 26, height: 22, margin: 5 }} />
                          Edit cover photo
                        </CoverButton>
                      </Dropdown>
                    )}
                  </div>
                </Form.Item>
                <Row style={{ marginTop: '-7%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ marginBottom: '1rem' }}>
                    <div>
                      <Form.Item
                        name="avatar"
                        valuePropName="file"
                        getValueFromEvent={(e: UploadChangeParam) => {
                          const image = e?.fileList[0] as IUploadedFile;
                          return image?.originFileObj;
                        }}
                      >
                        <Avatar size={160} src={avatar} />
                        <Dropdown overlay={avatarMenu} trigger={['click']}>
                          <AvatarButton style={{ border: "none", color: "black", borderRadius: "100px" }} icon={<CameraOutlined />} />
                        </Dropdown>
                      </Form.Item>
                    </div>
                    <Typography style={{ margin: 10, fontSize: 26 }}>{user?.email}</Typography>
                  </Col>
                  <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                    <EditButton type="primary" onClick={showModal}>
                      Edit Profile
                    </EditButton>
                    <Modal title="Edit Information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} 
                    footer={[
                      <Button key="cancel" onClick={handleCancel} style={{ backgroundColor: '#ff7f50', color: 'white' }}>
                        Cancel
                      </Button>,
                      <Button key="submit" type="primary" form="editProfileForm" htmlType="submit">
                        OK
                      </Button>
                    ]}>
                    <Form layout="vertical" id="editProfileForm" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                      <Form.Item name="biography" label={formConfig.aboutMe.label}>
                        <TextArea rows={4} placeholder={formConfig.aboutMe.placeholder} />
                      </Form.Item>
                      {formConfig.fields.map((field, index) => (
                        <Form.Item name={field.label.toLowerCase()} key={index} label={field.label}>
                          {field.type === "select" && (
                            <Select defaultValue={field.defaultValue}>
                              {field.options.map((option, idx) => (
                                <Select.Option key={idx} value={option}>
                                  {option}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Form.Item>
                      ))}
                      <Form.Item name="isBlocked" valuePropName="checked" label="Is Blocked">
                        <Switch />
                      </Form.Item>
                      <Form.Item name="isProfilePublic" valuePropName="checked" label="Is Profile Public">
                        <Switch />
                      </Form.Item>
                    </Form>
                  </Modal>
                  </Col>
                </Row>
                <Divider />
                <Row justify="center">
                  <Menu style={{ backgroundColor: "transparent", border: "none", fontSize: "26px" }} mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Posts</Menu.Item>
                    <Menu.Item key="2">Information</Menu.Item>
                    <Menu.Item key="3">Friends</Menu.Item>
                  </Menu>
                </Row>
                <Card style={{ marginTop: "10px", padding: "15px", textAlign: 'center' }}>
                  <Typography.Title level={4}>Short information</Typography.Title>
                </Card>
              </Form>
            </Card>
          </Row>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserProfilePage;
